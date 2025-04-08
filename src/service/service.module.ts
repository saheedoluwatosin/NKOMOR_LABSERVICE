import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [ServiceController],
    providers: [ServiceService,PrismaService],
    imports: [PrismaModule],
})
export class ServiceModule {}
