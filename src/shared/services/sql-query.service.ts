import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlQueryService {

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
