import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    if (!(req.headers.cookie && req.headers.cookie.includes('my_csrf'))) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.end('invalid csrf token');
    } else {
      const csrfCookie = req.headers.cookie         //This will be compared to the csrf token that we will store in database
        .split(';')
        .find((c) => c.trim().startsWith('my_csrf='))
        .split('=')[1];
      next();
    }
  }
}