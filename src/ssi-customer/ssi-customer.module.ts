import { Module, forwardRef } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './services/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './model/customer.entity';
import { AuthModule } from '../shared/guard/auth/auth.module';
import { ServiceModule } from '../shared/services/service.module';
import { UserModule } from '../ssi-user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerEntity]),forwardRef(() => AuthModule),ServiceModule,UserModule],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class SsiCustomerModule {}
