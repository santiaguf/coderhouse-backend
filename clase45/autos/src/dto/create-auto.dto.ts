import { ApiProperty } from '@nestjs/swagger';

export class CreateAutoDto {
  @ApiProperty()
  readonly marca: string;

  @ApiProperty()
  readonly modelo: string;

  @ApiProperty()
  readonly anio: number;
}
