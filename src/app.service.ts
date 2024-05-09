import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello World! Huuuray3!!!');
      }, 0);  // Delay de 1000 milisegundos (1 segundo)
    });
  }

  getPing(): string {
    return 'Pong!';
  }
}
