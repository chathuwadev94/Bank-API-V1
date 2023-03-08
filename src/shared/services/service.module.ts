import { Module } from '@nestjs/common';
import { SqlQueryService } from './sql-query.service';

@Module({
    providers: [SqlQueryService],
    exports: [SqlQueryService]
})
export class ServiceModule {

}
