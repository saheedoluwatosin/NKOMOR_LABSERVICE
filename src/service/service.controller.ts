import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto";





@Controller('service')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class ServiceController {
    constructor(private serviceservice:ServiceService) {}
    
    @Roles('SERVICE_PROVIDER')
    @Get('allservices')
    async getAllServices() {
        return "this is all services";
    }

    @Roles('SERVICE_PROVIDER')
    @Post('createservice')
    async addService(@Body() dto:CreateServiceDto, @Req() req:any) {
        console.log('req.user:', req.user);
        const userId = req.user?.userId;
        return this.serviceservice.create(userId, dto);
    }
}