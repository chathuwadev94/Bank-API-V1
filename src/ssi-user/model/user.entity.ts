import{Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, UpdateDateColumn} from 'typeorm'
import * as bcript from 'bcryptjs'

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('varchar')
    firstName:string;

    @Column({type:'varchar',default:null})
    lastName:string;

    @Column({type:'varchar',default:null})
    middleName:string;

    @Column({type:'varchar',default:null})
    gender:string;

    @Column({type:'varchar',default:null})
    address:string;

    @Column('text')
    NIC:string;

    @Column({
        type:'varchar',
        unique:true
    })
    username:string;

    @Column('text')
    password:string;
    
    @Column({ type: "int" })
    role:number;

    @Column('varchar')
    email:string;

    @Column('varchar')
    contact:string;

    @Column('varchar')
    mobile:string;

    @Column({
        type:'boolean',
        default:true
    })
    isActive:boolean;

    @CreateDateColumn()
    created:Date;

    @UpdateDateColumn()
    updated:Date;

    @Column({type:'varchar',default:null})
    createdBy:string;

    @Column({type:'varchar',default:null})
    description1:string;

    @Column({type:'varchar',default:null})
    description2:string;

    @Column({type:'varchar',default:null})
    description3:string;

    @Column({type:'varchar',default:null})
    description4:string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcript.hash(this.password,10);
    }

    async changePassword(newPassword:any){
        return await bcript.hash(newPassword,10);
    }

    toUsersResponseObject(showToken:boolean =true){
        const {id,created,username,role} = this;
        const userResponseObject = {id,created,username,role};
        return userResponseObject;
    }

    async comparePassword(attemp:string){
        return await bcript.compare(attemp,this.password);
    }

}
