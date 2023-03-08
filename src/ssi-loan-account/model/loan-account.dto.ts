import{ IsNotEmpty} from 'class-validator'

export class LoanAccountDto {

    readonly loanTrId:number;
    @IsNotEmpty()
    readonly loanNo:number;
    @IsNotEmpty()
    readonly loanAmount:number;
    @IsNotEmpty()
    readonly noOfInstallment:number;
    @IsNotEmpty()
    readonly installmentAmount:number;
    @IsNotEmpty()
    readonly transactionType:string;
    @IsNotEmpty()
    readonly loanBalance:number;
    readonly loanInitialState:boolean;
    readonly created:Date;
    readonly updated:Date;
    readonly createdBy:string;
    readonly isActive:boolean; 
    readonly description1:string;
    readonly description2:string;
    readonly description3:string;
    readonly description4:string;
    readonly skip:number;
    readonly limit:number;

}
