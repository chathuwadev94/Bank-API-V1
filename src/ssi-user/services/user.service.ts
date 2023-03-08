import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository, EntityManager } from 'typeorm';
import { UserDto } from '../model/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,private entityManager:EntityManager){}


    async findUser(username:string){
        let user = await this.userRepository.findOne({where:{username:username,isActive:true}});
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }

    async findAllUsers(){
        const users = await this.userRepository.find({where:{isActive:true}});
        if(!users){
            throw new NotFoundException();
        }
        return users;
    }

    async userLogin(data:UserDto){
        const {username,password} = data;
        let user = await this.userRepository.findOne({where:{username:username,isActive:true}});
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('invalid login',HttpStatus.BAD_REQUEST);
        }
    
     return user.toUsersResponseObject(true);
    }

    async userRegister(requestBody:UserDto,output_map){
        const {username}= requestBody;
        let user= await this.userRepository.findOne({where:[{username:username,isActive:true},
            {username:username,isActive:false}]});
        if(user){
            throw new HttpException('User Already Exist',HttpStatus.BAD_REQUEST);
        }
        user=await this.userRepository.create(requestBody);
        this.userRepository.save(user);
        // return user.toUsersResponseObject(true);
        let responseBody={
            data:this.finalResultFormat([user],output_map)
        }
        return responseBody;
    }
    

    async updateUser(requestBody:UserDto,output_map){
       let id = requestBody.id;
       let updatedUser:any;
        let user= await this.userRepository.findOne({where:{id}});
        if(user){
             await this.userRepository.update(id,requestBody);
              updatedUser= await this.userRepository.findOne({where:{id}})
        }else{
            throw new HttpException('User is not exist',HttpStatus.BAD_REQUEST)
        }

        let responseBody={
            data:this.finalResultFormat([updatedUser],output_map)
        }
        return responseBody;
      
    }

    async removeUser(id:string){
        let user= await this.userRepository.findOne({where:{id}});
        if(user){
            let result= await this.userRepository.update(id,{isActive:false});
            let response={
                id:id
            }
            if(result.raw.affectedRows>0){
                return response;
            }
        }else{
            throw new HttpException('User is not exist',HttpStatus.BAD_REQUEST)
        }
      
    }

    async changePassword(data:UserDto){
        const {username,password,newpassword} = data;
        let user = await this.userRepository.findOne({where:{username:username,isActive:true}});
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('invalid UserName or Password',HttpStatus.BAD_REQUEST);
        }
        let encyptpassword = await user.changePassword(newpassword);
        return await this.userRepository.update(user.id,{password:encyptpassword});

    }

    async findByUser(requestBody:UserDto,select_sqlQuery,column_map,output_map,count_sqlQuery){
        select_sqlQuery= select_sqlQuery+ this.generateWhere(requestBody,column_map) + this.generateOrderBy(requestBody) +this.generateLimit(requestBody);
        count_sqlQuery=count_sqlQuery+ this.generateWhere(requestBody,column_map);
        const users= await this.entityManager.query(select_sqlQuery);
        const recordCount= await this.entityManager.query(count_sqlQuery);
        let responseBody={
            skip:requestBody.skip,
            limit:requestBody.limit,
            recordCount:recordCount[0].count,
            data:this.finalResultFormat(users,output_map)
        }
        return responseBody;

    }

    async changeRole(requestBody:any){
        let id=requestBody.id;
        let updatedUser;
        let user = await this.userRepository.findOne({where:{id}});
        if(user){
            updatedUser= await this.userRepository.update(id,requestBody);
        }else{
             throw  new HttpException('User is not exist',HttpStatus.BAD_REQUEST);
        }
        let response={
            id:id,
            role:requestBody.role
        }
        return response;
    }

    public finalResultFormat(resultSet:any,map){
        if(resultSet.length===0){
            return [];
        }
        if(map===null || map===undefined){
            return resultSet;
        }
        let output=[];

        resultSet.forEach(result => {
            let formatObj={};
            for(const key in map){
                if(result.hasOwnProperty(key)){
                   formatObj[key]=result[key];
                }
            }
            output.push(formatObj);
            
        });
        return output;
    }

    public  generateLimit(searchReq:any){
       let  sqlQuery=   ' LIMIT '+searchReq.skip+','+searchReq.limit;
        return sqlQuery;
    }

    public generateOrderBy(searchReq:any){
        let sqlQuery;
        let orderObj= JSON.parse(searchReq.orderBy);
        if(Object.values(orderObj)[0]==1){
             sqlQuery = ' ORDER BY '+Object.keys(orderObj)[0]+ ' ASC '
        }else {
             sqlQuery = ' ORDER BY '+Object.keys(orderObj)[0]+ ' DESC '
        }
        return sqlQuery;
    }

    public  generateWhere(searchReq,Column_Map){
       let initQuery = 'WHERE isActive=true ';
       let condition = '';
       let tempSearchkeys=[];
        tempSearchkeys=searchReq.searchKeys;
       let tempOperators=searchReq.operators;
       let tempValues=searchReq.values; //length undefine err

        if(tempSearchkeys != null ){
            if(tempSearchkeys.length > 0){
                for(let i=0;i<tempSearchkeys.length;i++){
                    condition= this.appendCondition(tempSearchkeys[i],tempOperators[i],tempValues[i],condition);
                } 
            }
        }
        tempSearchkeys=[];
        tempOperators=[];
        tempValues=[];
       return initQuery + condition;
    }

    public appendCondition(searchkey:any,operator:any,value:any,condition:any){
        switch(operator){
            case '=':
            case 'eq':{
                if(value.constructor=== Number){
                    condition = condition+ ' AND '+ searchkey + ' = '+value;
                }else if(value.constructor===String){
                    condition = condition+ ' AND '+ searchkey + ' = '+'"'+value+'"';
                }
                else{
                    condition = condition+ ' AND '+ searchkey + ' = '+value;
                }
                break;
            }
            case 'like':{
                condition = condition+ ' AND '+ searchkey + ' LIKE '+'"'+'%'+value+'%'+'"';
                break;
            }
            case '%like':{
                condition = condition+ ' AND '+ searchkey + ' LIKE '+'"'+'%'+value+'"';
                break;
            }
            case 'like%':{
                condition = condition + ' AND '+ searchkey + ' LIKE '+'"'+value+'%'+'"';
                break;
            }
            case '>':
            case 'gt':{
                if(value.constructor===Number){
                    condition=condition+ ' AND '+ searchkey + ' > ' + value;
                }else {
                    condition=condition+ ' AND '+ searchkey + ' > ' +'"'+ value+'"';
                } 
                break;
            }
            case '>=':
            case 'gte':{
                if(value.constructor===Number){
                    condition=condition+ ' AND '+ searchkey + ' >= ' + value;
                }else {
                    condition=condition+ ' AND '+ searchkey + ' >= ' +'"'+ value+'"';
                }
                break;
            }  
            case '<':
            case 'lt': {
                if(value.constructor===Number){
                    condition=condition+ ' AND '+ searchkey + ' < ' + value;
                }else {
                    condition=condition+ ' AND '+ searchkey + ' < ' +'"'+ value+'"';
                } 
                break;
            } 
            case '<=':
            case 'lte':{
                if(value.constructor===Number){
                    condition=condition+ ' AND '+ searchkey + ' <= ' + value;
                }else {
                    condition=condition+ ' AND '+ searchkey + ' <= ' +'"'+ value+'"';
                }
                break;

            }   
            case 'in':{
                condition=condition+ ' AND '+ searchkey + ' IN ' +'('+ value+')';
                break;
            }     
            default:
            break; 
            
        }
        return condition;
    }
    
}
