import { Controller, Post, Body, Get, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerDto } from '../model/customer.dto';
import { CustomerService } from '../services/customer.service';
import { hasRoles } from '../../shared/guard/auth/decorator/role.decorator';
import { Roles } from '../../shared/guard/auth/role.enum';
import { JwtAuthGuard } from '../../shared/guard/auth/jwt-auth.guard';
import { RoleGuard } from '../../shared/guard/auth/role.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/customer')
@ApiTags('Customer')
export class CustomerController {

    constructor(private customerService: CustomerService) { }

    //Create customer
    @hasRoles(Roles.Admin, Roles.Manager, Roles.User)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UsePipes(new ValidationPipe())
    @Post('createCustomer')
    createCustomer(@Body() requestBody: CustomerDto) {
        let output_map = {
            firstName: "firstName",
            lastName: "lastName",
            NIC: "NIC",
            address: "address",
            mobileNo: "mobileNo",
            custId: "custId"
        }

        return this.customerService.createCustomer(requestBody, output_map);
    }
    //FindeOne Customer
    @hasRoles(Roles.Admin, Roles.Manager, Roles.User)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('findCustomers')
    findAllCustomers() {
        let output_map = {
            custId: "custId",
            custNo: "custNo",
            firstName: "firstName",
            NIC: "NIC"
        }
        return this.customerService.findAllCustomers(output_map);
    }
    //Update Customer
    @hasRoles(Roles.Admin, Roles.Manager)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put('updateCustomer')
    updateCustomer(@Body() requestBody: CustomerDto) {
        let output_map = {
            custId: "custId",
            firstName: "firstName",
            lastName: "lastName",
            NIC: "NIC",
            address: "address",
            mobileNo: "mobileNo",
            gender: "gender",
            contactNo: "contactNo",
            email: "email",
            profession: "profession",
            professionAddress: "professionAddress",
            professionContact: "professionContact",
            spouseName: "spouseName",
            spouseNIC: "spouseNIC",
            spouseContactNo: "spouseContactNo",
            spouseProfession: "spouseProfession"
        }
        return this.customerService.updateCustomer(requestBody, output_map);
    }
    //Remove Customer
    @hasRoles(Roles.Admin, Roles.Manager)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put('removeCustomer')
    removeCustomer(@Body() requestBody: CustomerDto) {
        let custId = requestBody.custId;

        return this.customerService.removeCustomer(custId);
    }
    //FindByCustomer
    @hasRoles(Roles.Admin, Roles.Manager, Roles.User)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('findByCustomer')
    findByCustomer(@Body() requestBody: CustomerDto) {
        let selectSqlQuery: string = 'SELECT * FROM customer_entity ';
        let countSqlQuery: string = 'SELECT COUNT(*) AS count FROM customer_entity ';
        let column_map: any;
        let output_map = {
            custNo: "custNo",
            firstName: "firstName",
            lastName: "lastName",
            NIC: "NIC",
            address: "address",
            mobileNo: "mobileNo",
            custId: "custId",
            gender: "gender",
            contactNo: "contactNo",
            email: "email",
            profession: "profession",
            professionAddress: "professionAddress",
            professionContact: "professionContact",
            spouseName: "spouseName",
            spouseNIC: "spouseNIC",
            spouseContactNo: "spouseContactNo",
            spouseProfession: "spouseProfession"

        }
        return this.customerService.findByCustomer(requestBody, selectSqlQuery, countSqlQuery, column_map, output_map);
    }
}
