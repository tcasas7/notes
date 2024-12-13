/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
  import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
  import { NotesService } from './notes.service';
  import { Note } from './note.entity';
  
  @ApiTags('Notes') // Para agrupar los endpoints bajo "Notes" en Swagger
  @Controller('notes')
  export class NotesController {
    constructor(private readonly notesService: NotesService) {}
  
    @Post()
    @ApiBody({
      description: 'Datos necesarios para crear una nota',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Mi primera nota' },
          content: { type: 'string', example: 'Contenido de la nota' },
          tags: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Importante' },
              },
            },
          },
        },
      },
    })
    create(@Body() note: Partial<Note>) {
      return this.notesService.create(note);
    }
  
    @Get()
    findAll() {
      return this.notesService.findAll();
    }
  
    @Get(':id')
    @ApiParam({
      name: 'id',
      description: 'ID de la nota que se desea obtener',
      example: 1,
    })
    findOne(@Param('id') id: number) {
      return this.notesService.findOne(id);
    }
  
    @Put(':id')
    @ApiParam({
      name: 'id',
      description: 'ID de la nota que se desea actualizar',
      example: 1,
    })
    @ApiBody({
      description: 'Datos necesarios para actualizar la nota',
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Título actualizado' },
          content: { type: 'string', example: 'Contenido actualizado' },
        },
      },
    })
    update(@Param('id') id: number, @Body() note: Partial<Note>) {
      return this.notesService.update(id, note);
    }
  
    @Delete(':id')
    @ApiParam({
      name: 'id',
      description: 'ID de la nota que se desea eliminar',
      example: 1,
    })
    remove(@Param('id') id: number) {
      return this.notesService.remove(id);
    }
  }
  
