import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ServiceModule, PrismaModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [],
  providers: [],
})
export class AppModule {}
