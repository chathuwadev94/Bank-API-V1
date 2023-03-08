import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../../../../ssi-user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService:UserService,
        private readonly jwtService: JwtService){}

    async validateUser(username:string,password:string){
        let user = await this.userService.findUser(username);
     
        if(user && await user.comparePassword(password)){
            const {password,...result} = user;
            return result;
        }
        return null;
    }

    async login(user :any){
        const payload = { firstName: user.firstName, id: user.id,role:user.role };
        let response={access_token: this.jwtService.sign(payload),user_detail:payload }
    return response;
    }
}
