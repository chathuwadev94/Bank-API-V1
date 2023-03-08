import { Controller, Post, Body } from '@nestjs/common';
import { LoanAccountDto } from '../model/loan-account.dto';
import { LoanAccountService } from '../services/loan-account.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/loanAccount')
@ApiTags('Loan Account')
export class LoanAccountController {

    constructor(private loanAccountService: LoanAccountService) {
    }

    @Post('createLoanAccount')
    async createLoanAccount(@Body() reqBody: LoanAccountDto) {
        let output_map = {}
        return await this.loanAccountService.createCustomer(reqBody, output_map);
    }//Create Loan Account


    @Post('checkAccount')
    checkAccount(@Body() reqBody) {
        let sqlQuery = ''
        let output_map = {
            firstName: "firstName",
            lastName: "lastName",
            NIC: "NIC",
            address: "address",
            mobileNo: "mobileNo",
            custId: "custId"
        }

    }

}
