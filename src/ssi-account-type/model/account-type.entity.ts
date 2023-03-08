import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MainAccountEntity } from "../../ssi-main-account/model/main-account.entity";
import { LoanAccountEntity } from "../../ssi-loan-account/model/loan-account.entity";

@Entity()
export class AccountTypeEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    name:string;

    @Column({
        type:'boolean',
        default:false
    })
    credit_acc:boolean;

    @Column({
        type:'boolean',
        default:false
    })
    debit_acc:boolean;

    @Column({type:'varchar',default:null})
    accTypeNo:string;

    @Column({type:'varchar',default:null})
    accTrType:string;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;

    @Column({type:'varchar',default:null})
    createdBy:string;

    @Column({
        type:'boolean',
        default:true
    })
    isActive:boolean;

    @Column({type:'varchar',default:null})
    description1:string;

    @Column({type:'varchar',default:null})
    description2:string;

    @Column({type:'varchar',default:null})
    description3:string;

    @Column({type:'varchar',default:null})
    description4:string;

    @OneToMany(()=>MainAccountEntity,mainAccount=>mainAccount.accType)
    mainAccount:MainAccountEntity[];

    @OneToMany(()=>LoanAccountEntity,loanAcc=>loanAcc.accType)
    loanAcc:LoanAccountEntity[];
    

}
