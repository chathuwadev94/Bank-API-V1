import { Controller, Post, Body, Get, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AccountTypeDto } from '../model/account-type.dto';
import { AccountTypeService } from '../service/account-type.service';
import { hasRoles } from '../../shared/guard/auth/decorator/role.decorator';
import { Roles } from '../../shared/guard/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../shared/guard/auth/jwt-auth.guard';
import { RoleGuard } from '../../shared/guard/auth/role.guard';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/account-type')
@ApiTags('Account Types')
export class AccountTypeController {

    constructor(private accTypeService:AccountTypeService){

    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @UsePipes(new ValidationPipe())
    @Post('createAccType')
    createAccountType(@Body() requestBody:AccountTypeDto){
        let output_map:any={};
        output_map={
            id:"id",
            name:"name",
            credit_acc:"credit_acc",
            debit_acc:"debit_acc",
            accTypeNo:"accTypeNo",
            accTrType:"accTrType",
            isActive:"isActive"
        }
       return this.accTypeService.createAccountTyep(requestBody,output_map); 

    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Get('findAccTypes')
    getAllAccountType(){
        let output_map={
            id:"id",
            name:"name",
            credit_acc:"credit_acc",
            debit_acc:"debit_acc",
            accTrType:"accTrType"
        }
       return this.accTypeService.findAllAccountTypes(output_map);
    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Put('updateAccType')
    updateAccountType(@Body() requestBody:AccountTypeDto){
        let output_map={
            id:"id",
            name:"name",
            credit_acc:"credit_acc",
            debit_acc:"debit_acc",
            accTrType:"accTrType"
        }
        return this.accTypeService.updateAccountTypes(requestBody,output_map);

    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Put('removeAccType')
    removeAccountType(@Body() requestBody:AccountTypeDto){
      
        return this.accTypeService.removeAccountTypes(requestBody);
    }

    @hasRoles(Roles.Admin,Roles.Manager)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Post('findByAccType')
    findByAccountType(@Body() requestBody:AccountTypeDto){
        let select_SqlQuery= 'SELECT * FROM account_type_entity '
        let count_SqlQuery='SELECT COUNT(*) AS count FROM account_type_entity '
        let column_map={

        }
        let output_map={
            id:"id",
            name:"name",
            credit_acc:"credit_acc",
            debit_acc:"debit_acc",
            accTypeNo:"accTypeNo",
            accTrType:"accTrType"
        }
        return this.accTypeService.findByAccountType(requestBody,select_SqlQuery,column_map,output_map,count_SqlQuery);
    }


    
}
