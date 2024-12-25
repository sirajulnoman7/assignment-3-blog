/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { TErrorSource } from './error.interface';
import handleValidationError from './ErrorsType/handleValidationError';
import config from '../../config';
import AppError from './ErrorsType/AppError';
import handleZodError from './ErrorsType/zodValidationError';
import { ZodError } from 'zod';
import handleDuplicateError11000 from './ErrorsType/handleDuplicateError';
import handleCastError from './ErrorsType/handleCastError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError11000(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
    // err,
  });
};

export default globalErrorHandler;
