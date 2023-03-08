import{ IsNotEmpty} from 'class-validator'

export class CustomerDto {

  readonly  custId:number;
  
            custNo:string;
  @IsNotEmpty()
  readonly  firstName:string;
 
  readonly  middleName:string;
  @IsNotEmpty()
  readonly  lastName:string;
  @IsNotEmpty()
  readonly  NIC:string;
  @IsNotEmpty()
  readonly  address:string;
  @IsNotEmpty()
  readonly  gender:string;
  readonly  contactNo:string;
  @IsNotEmpty()
  readonly  mobileNo:string;
  readonly  email:string;
  readonly  profession:string;
  readonly  professionAddress:string;
  readonly  professionContact:string;
  readonly  spouseName:string;
  readonly  spouseNIC:string;
  readonly  spouseContactNo:string;
  readonly  spouseProfession:string;
  readonly  loanCustomer:boolean;
  readonly  pawningCustomer:boolean;
  readonly  customerRate:number;
  readonly  joinDate:Date;
  readonly  created:Date;
  readonly  updated:Date;
  readonly  updatedBy:string;
  readonly  isActive:boolean
  readonly  description1:string;
  readonly  description2:string;
  readonly  description3:string;
  readonly  description4:string;
  readonly  skip:number;
  readonly  limit:number;


}
