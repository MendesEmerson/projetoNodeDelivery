import { Request, Response } from 'express';
import { ProblemDetail } from './ProblemDetail';

export class ExceptionHandler{
  static handle(
    error: unknown,
    request: Request,
    response: Response,
  ){
    if(error instanceof ProblemDetail){
      const problemDetail = error.toJson();
      return response.status(problemDetail.status).json(problemDetail)
    }

    console.error('Unhandled exception:', error);
    return response.status(500).json({
      status: 500,
      title: 'Internal Server Error',
      detail: 'An unexpected error occurred.',
    });
  }
}