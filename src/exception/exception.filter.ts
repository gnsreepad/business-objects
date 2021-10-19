import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class CustomExceptionsFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const logger = LoggerService.getInstance(CustomExceptionsFilter.name);
    logger.error(exception);
    const contextType = host.getType();
    const statusCode =
      exception instanceof HttpException
        ? 'INTERNAL_SERVER_ERROR' || exception.getStatus()
        : exception.statusCode || 'INTERNAL_SERVER_ERROR';

    const message =
      typeof exception.message === 'string'
        ? exception.message
        : exception.message?.message;

    const error =
      exception.response?.error || exception.message || 'Internal Server Error';

    const errorResponse = {
      statusCode: statusCode,
      message: message || 'Something went wrong',
      error: error,
    };

    if (contextType == 'http') {
      const httpHost = host.switchToHttp();
      const response = httpHost.getResponse<Response>();
      response.status(statusCode).json(errorResponse);
    } else {
      return new HttpException(errorResponse, statusCode);
    }
  }
}
