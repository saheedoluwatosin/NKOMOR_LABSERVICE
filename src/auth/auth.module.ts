import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    providers: [AuthService,JwtStrategy],
    controllers: [AuthController],
    imports: [PrismaModule,JwtModule.register({})]
})




export class AuthModule {}
