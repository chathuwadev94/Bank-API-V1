import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../model/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../model/customer.entity';
import { Repository, EntityManager } from 'typeorm';
import { PassThrough } from 'stream';
import { SqlQueryService } from '../../shared/services/sql-query.service';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(CustomerEntity) private customerRepository:Repository<CustomerEntity>,private entityManager:EntityManager
    ,private sqlQueryService:SqlQueryService ){}

    public async createCustomer(requestBody:CustomerDto,output_map:any){
        let NIC=requestBody.NIC;
        let checkedCustomer = await this.entityManager.findOne(CustomerEntity,{where:{NIC:NIC,isActive:true}});
        let tempCustNo= await this.entityManager.query('SELECT custId  FROM customer_entity ORDER BY custId DESC');
        let currentYear=new Date().getFullYear(); 
        //if table has zero data, very first insert's customer no is inccorect
        if(!tempCustNo[0]){
            requestBody.custNo = 'SSI-CUS-NO-B01-'+currentYear+'-'+(parseInt('0')+1);
        }else{
            requestBody.custNo = 'SSI-CUS-NO-B01-'+currentYear+'-'+(parseInt(tempCustNo[0].custId)+1);
        }
        if(checkedCustomer){
            throw new HttpException('User allready Exists',HttpStatus.FORBIDDEN);
        }
        try{
            let customer= await this.entityManager.create(CustomerEntity,requestBody);
            this.entityManager.save(CustomerEntity,customer);
            let response={
                data:this.sqlQueryService.finalResultFormat([customer],output_map)
            }
            return response;
        }catch(err){
            return err;
        }
    }

    public async updateCustomer(requestBody:CustomerDto,output_map:any){
        let custId = requestBody.custId;
        let checkCustomer= await this.entityManager.findOne(CustomerEntity,{where:{custId:custId,isActive:true}});
        if(!checkCustomer){
            throw new HttpException('Customer Not Found',HttpStatus.NOT_FOUND);
        }
        try{
            await this.entityManager.update(CustomerEntity,custId,requestBody);
            let customer =await this.entityManager.findOne(CustomerEntity,{where:{custId:custId,isActive:true}});
            let response={
                data:this.sqlQueryService.finalResultFormat([customer],output_map)
            }
            return response;

        }catch(err){
            return err;
        }
    }

    public async findAllCustomers(output_map:any){
       
        try{
            let customers= await this.entityManager.find(CustomerEntity,{where:{isActive:true}});
        if(!customers){
            throw new NotFoundException();
        }
        let response={
            data:this.sqlQueryService.finalResultFormat(customers,output_map)
        }
        return response;
        }
        catch(err){
            return err;
        }
    
    }

    public async removeCustomer(custId:number){
        try{
            let checkCustomer = await this.entityManager.findOne(CustomerEntity,{where:{custId:custId,isActive:true}});
            if(!checkCustomer){
                throw new NotFoundException();
            }
        let result= await this.entityManager.update(CustomerEntity,custId,{isActive:false});
        let response={
            custId:custId
        }
        if(result.raw.affectedRows>0){
            return response;
        }
        }catch(err){
            return err;
        }
    }

    public async findByCustomer(requestBody:CustomerDto,selectSqlQuery:string,countSqlQuery:string,column_map:any,output_map:any){
        try{
            selectSqlQuery=selectSqlQuery+this.sqlQueryService.generateWhere(requestBody,column_map)+this.sqlQueryService.generateOrderBy(requestBody)+this.sqlQueryService.generateLimit(requestBody);
            countSqlQuery=countSqlQuery+this.sqlQueryService.generateWhere(requestBody,column_map);
            let customer = await this.entityManager.query(selectSqlQuery);
            let recordCount= await this.entityManager.query(countSqlQuery);
            let response={
                data:this.sqlQueryService.finalResultFormat(customer,output_map),
                skip:requestBody.skip,
                limit:requestBody.limit,
                recordCount:recordCount[0].count

            }
            return response;

        }catch(err){
            return err;
        }
    }
}
