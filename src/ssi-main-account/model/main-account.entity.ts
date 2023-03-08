import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { CustomerEntity } from "../../ssi-customer/model/customer.entity";
import { AccountTypeEntity } from "../../ssi-account-type/model/account-type.entity";

@Entity()
export class MainAccountEntity {

    @PrimaryGeneratedColumn('increment')
    trId:number;

    @Column()
    loanNo:number;

    @Column()
    accountTypeId:number;

    @Column({type:'varchar'})
    accountTypeNo:string;

    @Column({type:'varchar'})
    accountTypeName:string;

    @Column({type:'varchar'})
    trType:string;

    @Column({ type: 'decimal', precision: 65, scale: 2, default: 0, })
    amount:number;

    @Column({ type: 'decimal', precision: 65, scale: 2, default: 0, })
    balance:number;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;

    @Column({type:'varchar'})
    createdBy:string;

    @Column({type:'boolean',default:false})
    isActive:boolean;

    @Column({type:'varchar',default:null})
    description1:string;

    @Column({type:'varchar',default:null})
    description2:string;

    @Column({type:'varchar',default:null})
    description3:string;

    @Column({type:'varchar',default:null})
    description4:string;

    @ManyToOne(()=>CustomerEntity,customer=> customer.mainAccount)
    customer:CustomerEntity[];

    @ManyToOne(()=>AccountTypeEntity,accType=>accType.mainAccount)
    accType:AccountTypeEntity[];
    
}
