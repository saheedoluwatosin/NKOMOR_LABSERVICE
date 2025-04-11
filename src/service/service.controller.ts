import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ServiceService } from "./service.service";
import { CreateServiceDto, UpdateServiceDto } from "./dto";





@Controller('service')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class ServiceController {
    constructor(private serviceservice:ServiceService) {}
    
    
    @Get('allservices')
    async getAllServices() {
        return this.serviceservice.findAll();
    }

    @Roles('SERVICE_PROVIDER')
    @Post('createservice')
    async addService(@Body() dto:CreateServiceDto, @Req() req:any) {
        console.log('req.user:', req.user);
        const userId = req.user?.userId;
        return this.serviceservice.create(userId, dto);
    }

    @Get(':id')
    async getService(@Param('id') id:string) {
        return this.serviceservice.findOne(id);
    }


    @Put(':id')
    @Roles('SERVICE_PROVIDER')
    async updateService(@Param('id') id:string, @Body() dto:UpdateServiceDto) {
        return this.serviceservice.update(id, dto);
    }

    @Delete(':id')
    @Roles('SERVICE_PROVIDER')
    async deleteService(@Param('id') id:string) {
        return this.serviceservice.remove(id);
    }
}