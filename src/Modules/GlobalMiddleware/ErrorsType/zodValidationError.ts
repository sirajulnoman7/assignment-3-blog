import { ZodError } from 'zod';
import { TErrorResponse, TErrorSource } from '../error.interface';

const handleZodError = (error: ZodError): TErrorResponse => {
  const errorSource: TErrorSource = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};
export default handleZodError;
