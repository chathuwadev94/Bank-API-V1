import{ IsNotEmpty} from 'class-validator'

export class MainAccountDto {

    readonly    trId:number;
    @IsNotEmpty()
    readonly    loanNo:number;
    @IsNotEmpty()
    readonly    accountTypeId:number;
    readonly    accountTypeNo:string;
    readonly    accountTypeName:string;
    @IsNotEmpty()
    readonly    trType:string;
    @IsNotEmpty()
    readonly    amount:number;
    @IsNotEmpty()
    readonly    balance:number;
    readonly    created:string;
    readonly    updated:string;
    @IsNotEmpty()
    readonly    createdBy:string;
    readonly    isActive:string;
    readonly    description1:string;
    readonly    description2:string;
    readonly    description3:string;
    readonly    description4:string;
    readonly    skip:number;
    readonly    limit:number;

}
