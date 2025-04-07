import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ServiceStatus } from '@prisma/client';






export class CreateServiceDto {

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: string[];

    @IsNumber()
    price : number;

    @IsEnum(ServiceStatus)
    service : ServiceStatus;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;


}