import mongoose from 'mongoose';
import { TErrorResponse, TErrorSource } from '../error.interface';

const handleCastError = (err: mongoose.CastError): TErrorResponse => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid Id',
    errorSource,
  };
};
export default handleCastError;
