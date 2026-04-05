import { Injectable } from '@nestjs/common';
import { CardIdGenerator } from '../../application/card-id-generator.port';

@Injectable()
export class InMemoryCardIdGenerator implements CardIdGenerator {
  private sequence = 0;

  next(): string {
    this.sequence += 1;
    return `card-${this.sequence}`;
  }
}
