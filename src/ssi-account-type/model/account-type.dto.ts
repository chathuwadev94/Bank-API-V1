import{ IsNotEmpty} from 'class-validator'

export class AccountTypeDto {

id:number;
@IsNotEmpty()
name:string;
@IsNotEmpty()
credit_acc:boolean;
@IsNotEmpty()
debit_acc:boolean;
accTypeNo:string;
@IsNotEmpty()
accTrType:string;
created:string;
updated:string;
createdBy:string;
isActive:boolean;
skip:number;
limit:number;
description1:string;
description2:string;
description3:string;
description4:string;

}
