import { INestApplication } from '@nestjs/common';

export class AppSingleton {
  private static instance: INestApplication;

  public static setInstance(instance: INestApplication) {
    this.instance = instance;
  }

  public static getInstance() {
    return this.instance;
  }
}
