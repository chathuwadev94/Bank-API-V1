import{ IsNotEmpty} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    readonly  id:string
    @IsNotEmpty()
    readonly firstName:string;
    @IsNotEmpty()
    readonly lastName:string;
    readonly middleName:string;
    readonly gender:string;
    readonly address:string;
    @IsNotEmpty()
    readonly NIC:string;
    @IsNotEmpty()
    readonly username:string;
    @IsNotEmpty()
    readonly password:string;
    readonly role:number;
    readonly email:string;
    readonly contact:string;
    @IsNotEmpty()
    readonly mobile:string
    readonly isActive:boolean;
    readonly created:Date;
    readonly updated:Date;
    readonly  createdBy:string;
    readonly newpassword:string;
    readonly description1:string;
    readonly description2:string;
    readonly description3:string;
    readonly description4:string;
    readonly skip:number;
    readonly limit:number;


}


