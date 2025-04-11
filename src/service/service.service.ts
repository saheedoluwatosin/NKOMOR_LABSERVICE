import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { Injectable } from "@nestjs/common";
import { UpdateServiceDto } from "./dto";





@Injectable()
export class ServiceService{
    constructor(private prisma:PrismaService){}


    create(userId: string, dto:CreateServiceDto){
        //console.log("userId received:", userId)
       return this.prisma.service.create({
        data:{
                ...dto,
                provider: { connect: { customId: userId} },
              },
       })

    }

    findAll() {
        return this.prisma.service.findMany({
          include: { provider: true },
        });
      }

    findOne(id:string){
      return this.prisma.service.findUnique({
        where:{id},
        include:{provider:true}
      })
      
    }

    update(id:string , dto:UpdateServiceDto){
      return this.prisma.service.update({
        where:{id},
        data:dto
      })
    }

    remove(id:string){
      return this.prisma.service.delete({
        where:{id}
      })
    }
    // This method is used to find services by provider ID
    // It returns an array of services associated with the given provider ID
    findByProviderId(providerId: string) {
        return this.prisma.service.findMany({
          where: { providerId },
        });
      }

}