import { Module, forwardRef } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm'
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './model/user.entity';
import { AuthModule } from '../shared/guard/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
