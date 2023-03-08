import { Module } from '@nestjs/common';
import { LoanAccountController } from './controller/loan-account.controller';
import { LoanAccountService } from './services/loan-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanAccountEntity } from './model/loan-account.entity';
import { SqlQueryService } from '../shared/services/sql-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanAccountEntity])],
  controllers: [LoanAccountController],
  providers: [LoanAccountService,SqlQueryService
  ]
})
export class SsiLoanAccountModule { }
