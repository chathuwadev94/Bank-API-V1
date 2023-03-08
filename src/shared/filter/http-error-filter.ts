import { ExceptionFilter, Catch, ArgumentsHost, HttpException,Logger } from "@nestjs/common";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {

    catch(exception:HttpException,host:ArgumentsHost){
        const exe = host.switchToHttp();
        const request= exe.getRequest();
        const response= exe.getResponse();
        const status= exception.getStatus();

        const errorResponse = {
            code:status,
            date: new Date().toLocaleDateString(),
            path:request.url,
            method: request.method,
            message:exception
            
        }
        Logger.error(request.method + request.url ,JSON.stringify(errorResponse),'ExceptionFilter');

        response.status(status).json(errorResponse);
    }

}
