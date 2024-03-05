import { Controller, Get, Post, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/get-token')
  async getHello(@Res() res) {
    const token = await res.generateCsrf();
    console.log('token',token)
    res.status(200).send(token);
  }

  @Post('/test-token')
  test(@Res() res) {
    console.log('can access this api with valid token')
    res.status(200).send('token is valid');
  }
}
