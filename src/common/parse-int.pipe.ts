import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { responses } from 'src/utils/response.handler';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const number = Number(value);
    console.log(number);
    if (isNaN(number))
      throw new HttpException(
        responses.error(400, 'BadRequest: id must be an Number'),
        HttpStatus.BAD_REQUEST,
      );
    return number;
  }
}
