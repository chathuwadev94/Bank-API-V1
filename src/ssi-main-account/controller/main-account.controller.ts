import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('main-account')
@ApiTags('Main Account')
export class MainAccountController {}
