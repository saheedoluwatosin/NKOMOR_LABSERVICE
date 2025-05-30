import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto, SigninDto } from "src/dto";
import { AuthService } from "./auth.service";



@Controller('auth')


export class AuthController {

    constructor(private authService:AuthService ){}

    @Post('register')
    async register(@Body() authDto: AuthDto) {
        return await this.authService.signup(authDto);
    }

    @Post('login')
    siginIn(@Body() authDto: SigninDto) {
        return this.authService.signin(authDto);

    }

}