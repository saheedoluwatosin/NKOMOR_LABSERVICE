import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { Injectable } from "@nestjs/common";





@Injectable()
export class ServiceService{
    constructor(private prisma:PrismaService){}


    create(userId: string, dto:CreateServiceDto){
        console.log("userId received:", userId)
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

}