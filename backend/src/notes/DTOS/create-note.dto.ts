/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
  
  @IsArray()
  @IsString({ each: true }) 
  tags: string[];
}
