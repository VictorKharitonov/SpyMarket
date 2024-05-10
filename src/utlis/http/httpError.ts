export interface IHttpError {
  message: string;
  status: number;
}

export default class HttpError extends Error {
  public readonly status: number;
  
  constructor({ message, status }: IHttpError ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}