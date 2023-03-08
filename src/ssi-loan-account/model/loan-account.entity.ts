import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { CustomerEntity } from "../../ssi-customer/model/customer.entity";
import { AccountTypeEntity } from "../../ssi-account-type/model/account-type.entity";

@Entity()
export class LoanAccountEntity {

    @PrimaryGeneratedColumn('increment')
    loanTrId:number;

    @Column()
    loanNo:number;

    @Column({ type: 'decimal', precision: 65, scale: 2, default: 0, })
    loanAmount:number;

    @Column()
    noOfInstallment:number;

    @Column({ type: 'decimal', precision: 65, scale: 2, default: 0, })
    installmentAmount:number;

    @Column({type:'varchar'})
    transactionType:string;

    @Column({ type: 'decimal', precision: 65, scale: 2, default: 0, })
    loanBalance:number;

    @Column({type:'boolean', default:false})
    loanInitialState:boolean;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;

    @Column({type:'varchar'})
    createdBy:string;

    @Column({type:'boolean', default:true})
    isActive:boolean;

    @Column({type:'varchar',default:null})
    description1:string;

    @Column({type:'varchar',default:null})
    description2:string;

    @Column({type:'varchar',default:null})
    description3:string;

    @Column({type:'varchar',default:null})
    description4:string;

    @ManyToOne(()=>CustomerEntity,customer=>customer.loanAccount)
    customer:CustomerEntity;

    @ManyToOne(()=>AccountTypeEntity,accType=>accType.loanAcc)
    accType:AccountTypeEntity[];

}
