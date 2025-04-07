import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";





@Controller('service')

export class ServiceController {
    constructor() {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('allservices')
    async getAllServices() {
        return "this is all services";
    }
}