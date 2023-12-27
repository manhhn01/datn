export interface Response<T> {
  statusCode: number;
  message: string;
  data: {
    result: T;
    meta: Record<string, any>;
  };
}
