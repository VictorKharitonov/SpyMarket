import HttpError from '@/utlis/http/httpError';
import {unknownError} from "@/consts";

export default class ErrorHandler {
  constructor(error: unknown) {
    if (error instanceof HttpError) {
      return Response.json(error.message , { status: error.status});
    }
    else if (error instanceof Error) {
      return Response.json(error.message , { status: 400 });
    } else {
      return Response.json(unknownError, { status: 500 });
    }
  }
}