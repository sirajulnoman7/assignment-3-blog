export type TErrorSource = {
  path: number | string;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
