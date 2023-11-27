import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.ValidateUser(signInDto.name, signInDto.prop);
    }
}
