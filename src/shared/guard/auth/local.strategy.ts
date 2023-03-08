import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./service/auth.service";
import { STATUS_CODES } from "http";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super();
    }

    async validate(username:string,password:string):Promise<any>{
        
        const user = await this.authService.validateUser(username,password);
        if(!user){
            throw new UnauthorizedException();
        }
        if(user.role==4){
            throw new UnauthorizedException();
        }
        return user;
    }
}