import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  question!: string;

  @IsString()
  answer!: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
