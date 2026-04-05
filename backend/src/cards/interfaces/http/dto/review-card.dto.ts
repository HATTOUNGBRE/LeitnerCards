import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ReviewCardDto {
  @IsBoolean()
  isValid!: boolean;

  @IsString()
  @IsOptional()
  referenceDate?: string;
}
