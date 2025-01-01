import { Allow } from 'class-validator';

export class ContextAwareDto {
  @Allow()
  context?: {
    user: any;
  };
}
