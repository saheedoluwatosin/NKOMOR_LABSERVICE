import { Controller, Get } from "@nestjs/common";





@Controller('service')

export class ServiceController {
    constructor() {}
    
    @Get('allservices')
    async getAllServices() {
        return 'all services';
    }
}