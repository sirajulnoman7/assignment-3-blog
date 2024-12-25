/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSource } from '../error.interface';

const handleDuplicateError11000 = (err: any): TErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: '',
      message: extractedMessage,
    },
  ];
  const statusCode = 400;

  return {
    statusCode: statusCode,
    message: err.message,
    errorSource,
  };
};

export default handleDuplicateError11000;
