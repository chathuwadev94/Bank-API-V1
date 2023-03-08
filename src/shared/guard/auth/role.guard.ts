import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, async } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../../ssi-user/services/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector,private userService:UserService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){
      return true;
    }
    const request= context.switchToHttp().getRequest();
    const valid =  this.matchRoles(roles, request.user.role);
    return valid;
  }

 matchRoles(requiredRole:any,currentRole:any){
   for(let x=0;x<requiredRole.length;x++){
      if(currentRole==requiredRole[x]){
        return true
        break;
      }
   }
   return false;
      
  }
}
