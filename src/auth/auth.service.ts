import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthDto, SigninDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private config:ConfigService, private jwtService: JwtService ){}

    async generateCustomId(): Promise<string> {
        const year = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of the year (e.g., 24 for 2024)
    
        // Find the last registered user with a customId starting with the current year
        const lastUser = await this.prisma.user.findFirst({
          where: {
            customId: {
              startsWith: year, // Example: "24"
            },
          },
          orderBy: {
            customId: 'desc', // Get the last registered user
          },
        });
    
        // Extract and increment the last counter
        let counter = 1;
        if (lastUser && lastUser.customId) {
          const lastCounter = parseInt(lastUser.customId.substring(2), 10); // Extract numeric part
          counter = lastCounter + 1;
        }
    
        // Format ID as YYXXXX (e.g., "240001", "240002", ..., "250001" for 2025)
        return `${year}${String(counter).padStart(4, '0')}`;
      }

    async signup(dto:AuthDto){
    const {email,password,role,providerType,...otherDetails}= dto
      try {
        const existingUser = await this.prisma.user.findUnique({where:{email}})
        if(existingUser){
            throw new BadRequestException ('Email is already register');
        }

        const hashedpassword = await argon.hash(dto.password)
        const customId = await this.generateCustomId()
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedpassword,
                role,
                providerType,
                customId,
                ...otherDetails, 
              },
              

               
            
        })

        return this.getResponseByRole(user)

      } catch (error) {
        throw new InternalServerErrorException('Error registering user', error.message);
      }
      
      
    }

    private getResponseByRole(user: any) {
        const baseData = {
            customId: user.customId,
            email: user.email,
        };

        if (user.role === 'SERVICE_PROVIDER') {
          if (user.providerType === 'LAB') {
            return {
              message: 'Lab registered successfully',
              data: {
                ...baseData,
                labName: user.labName,
                businessNo: user.businessNo,
                businessName: user.name,
                phonenumber: user.phonenumber,
                location: user.location,
              },
            };
          } else if (user.providerType === 'PHARMACY') {
            return {
              message: 'User registered successfully',
              data: {
                ...baseData,    
                pharmacyName: user.pharmacyName,
                businessNo: user.businessNo,
                location: user.location,
              },
            };
          }
        }
    
        // Default fallback if no conditions are met
        return {
          message: 'User registered successfully',
          data: {
            ...baseData,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          },
        };
      }





   async signin(dto:SigninDto){
        const {email,password} = dto
        try {
          const existingUser = await this.prisma.user.findUnique({where:{email}})
          
          if(!existingUser){
            throw new ForbiddenException ('User doesnt exist please register');
          }

          const pwdMatches = await argon.verify(existingUser.password,password)
          if(!pwdMatches){
            throw new ForbiddenException ('Invalid credentials');
          }

          const token = await this.signInToken(existingUser.customId,existingUser.email,existingUser.role)
          return token

        } catch (error) {
          throw new BadRequestException(error.message);
        }

    }


   async signInToken(userid:String,email:String,role:string){
    const payload = {
        sub: userid,
        email,
        role
    }

    return {
        access_token: this.jwtService.sign(payload,{
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRES_IN')
        }),
    }
   }
}