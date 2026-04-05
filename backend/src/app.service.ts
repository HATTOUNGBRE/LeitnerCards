import { Injectable } from '@nestjs/common';

export type ApplicationStatus = {
  name: string;
  status: 'ready';
  boundedContexts: string[];
};

@Injectable()
export class AppService {
  getStatus(): ApplicationStatus {
    return {
      name: 'LeitnerCards API',
      status: 'ready',
      boundedContexts: ['cards'],
    };
  }
}
