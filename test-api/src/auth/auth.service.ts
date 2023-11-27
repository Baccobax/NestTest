import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) { }

        async ValidateUser(name : string, property : string): Promise<any> {
            const user = await this.usersService.findByName(name);
            if (user?.prop !== property) {
                throw new UnauthorizedException();
            }
            const payload = {sub: user.id , name: user.name, prop: user.prop};
            //TODO Generare un JWT e ritornarlo
            //invece che the l'oggetto user
            return {access_token: await this.jwtService.signAsync(payload)};
        }
}
