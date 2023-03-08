import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './ssi-user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/filter/http-error-filter';
import { AuthModule } from './shared/guard/auth/auth.module';

import config from 'ormConfig';
import { AccountTypeModule } from './ssi-account-type/account-type.module';
import { SqlQueryService } from './shared/services/sql-query.service';
import { ServiceModule } from './shared/services/service.module';
import { SsiCustomerModule } from './ssi-customer/ssi-customer.module';
import { SsiMainAccountModule } from './ssi-main-account/ssi-main-account.module';
import { SsiLoanAccountModule } from './ssi-loan-account/ssi-loan-account.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),UserModule,AuthModule,AccountTypeModule,ServiceModule, SsiCustomerModule, SsiMainAccountModule, SsiLoanAccountModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide : APP_FILTER,
      useClass : HttpErrorFilter
    }
  ]
})
export class AppModule {}
