import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SqlQueryService } from '../../shared/services/sql-query.service';
import { LoanAccountDto } from '../model/loan-account.dto';
import { LoanAccountEntity } from '../model/loan-account.entity';

@Injectable()
export class LoanAccountService {

    constructor(private entityManager: EntityManager
        , private sqlQueryService: SqlQueryService) { }

    public async createCustomer(requestBody: LoanAccountDto, output_map: any) {
        try {
            let loanAccount = await this.entityManager.create(LoanAccountEntity, requestBody);
            this.entityManager.save(LoanAccountEntity, loanAccount);
            if (loanAccount) {
                let response = {
                    data: this.sqlQueryService.finalResultFormat([loanAccount], output_map)
                }
                return response;
            }
        } catch (err) {
            return err;
        }
    }
}
