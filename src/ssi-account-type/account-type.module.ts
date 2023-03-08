import { Module, forwardRef } from '@nestjs/common';
import { AccountTypeController } from './controller/account-type.controller';
import { AccountTypeService } from './service/account-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountTypeEntity } from './model/account-type.entity';
import { AuthModule } from '../shared/guard/auth/auth.module';
import { AppModule } from '../app.module';
import { ServiceModule } from '../shared/services/service.module';
import { UserModule } from '../ssi-user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([AccountTypeEntity]),forwardRef(() => AuthModule),ServiceModule,UserModule],
  controllers: [AccountTypeController],
  providers: [AccountTypeService]
})
export class AccountTypeModule {}
