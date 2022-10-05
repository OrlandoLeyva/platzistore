import { ErrorResponse, SuccessResponse } from 'src/interfaces/http-responses';

// interface Responses {
//   success: Function;
//   error: Function;
// }

export const responses = {
  success: (
    statusCode: number,
    message: string,
    data: object[] | object,
  ): SuccessResponse => {
    return {
      statusCode,
      message,
      data,
    };
  },

  error: (statusCode: number, message: string): ErrorResponse => {
    return {
      statusCode,
      message,
    };
  },
};
