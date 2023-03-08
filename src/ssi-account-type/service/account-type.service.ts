import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeEntity } from '../model/account-type.entity';
import { Repository, EntityManager, getConnection } from 'typeorm';
import { AccountTypeDto } from '../model/account-type.dto';
import { SqlQueryService } from '../../shared/services/sql-query.service';
import { response } from 'express';

@Injectable()
export class AccountTypeService {
    constructor(@InjectRepository(AccountTypeEntity) private accountTypeRepository:Repository<AccountTypeEntity>,private entityManager:EntityManager
    ,private sqlQueryService:SqlQueryService){
        
    }

  async  createAccountTyep(requestBody:AccountTypeDto,output_map:any){
      const  {name}=requestBody;
      let accTypeName=  await this.accountTypeRepository.findOne({where:{name:name,isActive:true}});
      
      let typeNum= await this.entityManager.query('SELECT COUNT(*) AS count FROM account_type_entity')
      let tempaccTypeNo = "SSI-ACC-TYPE-NO-"+(parseInt(typeNum[0].count)+1);
      requestBody.accTypeNo=tempaccTypeNo;
      
      if(accTypeName){
        throw new HttpException('Account-Type Name Unavailable',HttpStatus.BAD_REQUEST);
      }
      try{
        let accType = await this.accountTypeRepository.create(requestBody);
        this.accountTypeRepository.save(accType);
          let responseBody={
              data:this.sqlQueryService.finalResultFormat([accType],output_map)
          }
          return responseBody;
      }
      catch(err){
        return err;
      }

    }

    async findAllAccountTypes(output_map:any){

        try{
            let accType= await this.accountTypeRepository.find({where:{isActive:true}});
            if(!accType){
                throw new HttpException("Not Found",HttpStatus.FORBIDDEN);
            }
            let  response={
                data: accType
            }
            return response;

        }catch(err){
            return err;
        }
    }

    async updateAccountTypes(requestBody:AccountTypeDto,output_map:any){
        let id=requestBody.id;
        let accType= await this.accountTypeRepository.findOne({where:{id:id,isActive:true}});
        if(!accType){
            throw new NotFoundException();
        }
        try{
           await this.accountTypeRepository.update(id,requestBody);
           let updateAccType= await this.accountTypeRepository.findOne({where:{id}});
           let response ={
               data:this.sqlQueryService.finalResultFormat([updateAccType],output_map)
           }
           return response;
        }catch(err){
            return err;
        }
    }

    async removeAccountTypes(requestBody:AccountTypeDto){
        let id=requestBody.id;
        let accType= await this.accountTypeRepository.findOne({where:{id:id,isActive:true}});
        if(!accType){
            throw new NotFoundException();
        }
        try{
          let result=  await this.accountTypeRepository.update(id,{isActive:false});
          let response ={
            id:id
        }
            if(result.raw.affectedRows>0){
                return response;
            }
         }catch(err){
             return err;
         }
    }

    async findByAccountType(requestBody:AccountTypeDto,select_SqlQuery:string,column_map:any,output_map:any,count_SqlQuery){
         select_SqlQuery= select_SqlQuery + this.sqlQueryService.generateWhere(requestBody,column_map)+this.sqlQueryService.generateOrderBy(requestBody)+this.sqlQueryService.generateLimit(requestBody);
         count_SqlQuery=count_SqlQuery+this.sqlQueryService.generateWhere(requestBody,column_map)
         try{
             let accTypes= await this.entityManager.query(select_SqlQuery);
             let recordCount=await this.entityManager.query(count_SqlQuery);
             let response={
                skip:requestBody.skip,
                limit:requestBody.limit,
                recordCount:recordCount[0].count,
                data:this.sqlQueryService.finalResultFormat(accTypes,output_map)
             }

             return response;
         }
         catch(err){
            return err;
         }

    }
}
