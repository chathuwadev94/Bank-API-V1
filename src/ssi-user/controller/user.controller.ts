import { Controller, Get, Post, Body, UsePipes, UseGuards, Inject, forwardRef, Request, Put, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { findParsedNumbers } from 'libphonenumber-js';
import { UserDto } from '../model/user.dto';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { JwtAuthGuard } from '../../shared/guard/auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../shared/guard/auth/local-auth.guard';
import { AuthService } from '../../shared/guard/auth/service/auth.service';
import { RoleGuard } from '../../shared/guard/auth/role.guard';
import { hasRoles } from '../../shared/guard/auth/decorator/role.decorator';
import { Roles } from '../../shared/guard/auth/role.enum';
import { UpdateValuesMissingError } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('User')
export class UserController {

    constructor(private userService:UserService,
        private authService:AuthService){}

    @Get('findUsers')
    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    findAllUsers(){
        try{
            return this.userService.findAllUsers();
        }catch(err){
            return err;
        }
    }

    @Post('userLogin')
    @UsePipes(new ValidationPipe())
    @UseGuards(LocalAuthGuard)
    loginUser(@Request() data){
        return this.authService.login(data.user);
    }

    @Post('userRegister')
    @ApiCreatedResponse({description:'User Create'})
    @ApiBody({type:UserDto})
    @hasRoles(Roles.Admin)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @UsePipes(new ValidationPipe())
    userRegister(@Body() requestBody:UserDto){
        let output_map:any={
            firstName:"firstName",
            lastName:"lastName",
            address:"address",
            NIC:"NIC",
            email:"email",
            mobile:"mobile",
            isActive:"isActive",
            role:"role"
        }
        return this.userService.userRegister(requestBody,output_map);
    }
    
    @Put('updateUser')
    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    updateUser(@Body() data:UserDto){
        let output_map:any={
            id:"id",
            firstName:"firstName",
            lastName:"lastName",
            address:"address",
            NIC:"NIC",
            email:"email",
            mobile:"mobile",
            isActive:"isActive"
        }
        return this.userService.updateUser(data,output_map);
    }

    @Put('removeUser')
    @hasRoles(Roles.Admin)
    @UseGuards(JwtAuthGuard,RoleGuard)
    removeUser(@Body() requestBody:any){
        return this.userService.removeUser(requestBody.id);
    }

    @Put('changePassword')
    @UseGuards(JwtAuthGuard)
    changePassword(@Body()data:UserDto){
       return this.userService.changePassword(data);
    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Post('findByUser')
    findByUser(@Body() requestBody:UserDto){

        let select_sqlQuery:string='SELECT * FROM user_entity ';
        let count_sqlQuery:string='SELECT COUNT(*) AS count FROM user_entity '
        let column_map:any={
            firstName:"firstName"
        };
        let output_map:any={
            id:"id",
            firstName:"firstName",
            middleName:"middleName",
            lastName:"lastName",
            address:"address",
            NIC:"NIC",
            email:"email",
            mobile:"mobile",
            contact:"contact",
            isActive:"isActive",
            created_date:"created",
            username:"username",
            gender:"gender",
            role:"role"
        }
        return this.userService.findByUser(requestBody,select_sqlQuery,column_map,output_map,count_sqlQuery);
    }

    @hasRoles(Roles.Admin)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @UsePipes(ValidationPipe)
    @Post('changeRole')
    changeRole(@Body() requestBody:any){
      return  this.userService.changeRole(requestBody);
    }
    
}
