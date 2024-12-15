/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from './tag.entity';

@Entity('note') // Especificar explícitamente el nombre de la tabla
export class Note {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID único de la nota',
  })
  id: number;

  @Column({ type: 'character varying' }) // Coincidir con el tipo de la columna en la DB
  @ApiProperty({
    example: 'Título de la nota',
    description: 'El título de la nota',
  })
  title: string;

  @Column({ type: 'character varying' })
  @ApiProperty({
    example: 'Contenido de la nota',
    description: 'El contenido de la nota',
  })
  content: string;

  @Column({ type: 'boolean', default: false }) // Asegurar el tipo booleano
  @ApiProperty({
    example: false,
    description: 'Indica si la nota está archivada o no',
    default: false,
  })
  isArchived: boolean;

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-12-13T12:00:00Z',
    description: 'Fecha de creación de la nota',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-12-13T12:30:00Z',
    description: 'Fecha de la última actualización de la nota',
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable()
  @ApiProperty({
    type: () => [Tag],
    description: 'Lista de etiquetas asociadas a la nota',
  })
  tags: Tag[];
}
