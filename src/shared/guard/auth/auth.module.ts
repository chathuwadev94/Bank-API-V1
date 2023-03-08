import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../../../ssi-user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[forwardRef(() => UserModule),PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
