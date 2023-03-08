import {  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { CustomerDto } from "./customer.dto";
import { LoanAccountEntity } from "../../ssi-loan-account/model/loan-account.entity";
import { MainAccountEntity } from "../../ssi-main-account/model/main-account.entity";

@Entity()
export class CustomerEntity {

    @PrimaryGeneratedColumn('increment')
    custId:number;

    @Column({type:'varchar'})
    custNo:string;

    @Column({type:'varchar'})
    firstName:string;

    @Column({type:'varchar'})
    middleName:string;

    @Column({type:'varchar'})
    lastName:string;

    @Column({type:'varchar'})
    NIC:string;

    @Column({type:'varchar'})
    address:string;

    @Column({type:'varchar'})
    gender:string;

    @Column({type:'varchar',default:null})
    contactNo:string;

    @Column({type:'varchar'})
    mobileNo:string;

    @Column('varchar')
    email:string;

    @Column({type:'varchar',default:null})
    profession:string;

    @Column({type:'varchar',default:null})
    professionAddress:string;

    @Column({type:'varchar',default:null})
    professionContact:string;

    @Column({type:'varchar',default:null})
    spouseName:string;

    @Column({type:'varchar',default:null})
    spouseNIC:string;

    @Column({type:'varchar',default:null})
    spouseContactNo:string;

    @Column({type:'varchar',default:null})
    spouseProfession:string;

    @Column({
        type:'boolean',
        default:false
    })
    loanCustomer:boolean;

    @Column({
        type:'boolean',
        default:false
    })
    pawningCustomer:boolean;

    @Column({type:'int',default:null})
    customerRate:number;

    @CreateDateColumn()
    joinDate:Date;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;

    @Column({type:'varchar',default:null})
    updatedBy:string;

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

    @OneToMany(()=>LoanAccountEntity,loanAccount=>loanAccount.customer)
    loanAccount:LoanAccountEntity[];

    @OneToMany(()=>MainAccountEntity,mainAccount=>mainAccount.customer)
    mainAccount:MainAccountEntity[];

}
