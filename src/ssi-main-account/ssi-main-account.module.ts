import { Module } from '@nestjs/common';
import { MainAccountController } from './controller/main-account.controller';
import { MainAccountService } from './services/main-account.service';

@Module({
  controllers: [MainAccountController],
  providers: [MainAccountService]
})
export class SsiMainAccountModule {}
