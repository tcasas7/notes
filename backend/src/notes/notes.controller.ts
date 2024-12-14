/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { NotesService } from './services/notes.service';
import { CreateNoteDto } from './DTOS/create-note.dto';
import { UpdateNoteDto } from './DTOS/update-note.dto';
import { Tag } from './tag.entity';
import { Note } from './note.entity';


@ApiTags('Notes') 
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiBody({
    description: 'Data required to create a note',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My first note' },
        content: { type: 'string', example: 'Note content' },
        tags: {
          type: 'array',
          items: {
            type: 'string',
            example: 'Important',
          },
        },
      },
    },
  })
  async create(@Body() createNoteDto: CreateNoteDto) {
     const tags = createNoteDto.tags.map((tagName) => {
      const tag = new Tag();
      tag.name = tagName; 
      return tag; 
    });

    return this.notesService.create({ ...createNoteDto, tags });
  }

  @Get()
  async findAll(@Query('archived') archived: string): Promise<Note[]> {
    const isArchived = archived === 'true'; 
    return this.notesService.getAllNotes(isArchived);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID of the note to retrieve',
    example: 1,
  })
  async findOne(@Param('id') id: number): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'ID of the note to update',
    example: 1,
  })

  @ApiBody({
    description: 'Data required to update the note',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated title' },
        content: { type: 'string', example: 'Updated content' },
        tags: {
          type: 'array',
          items: {
            type: 'string',
            example: 'Updated tag',
          },
        },
      },
    },
  })
    async update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto): Promise<void> {
    const tags: Tag[] = updateNoteDto.tags.map((tagName) => {
      const tag = new Tag();
      tag.name = tagName;
      return tag;
    });

    return this.notesService.update(id, { ...updateNoteDto, tags });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID of the note to delete',
    example: 1,
  })

  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(id);
  }

  @Patch(':id/archive')
  @ApiParam({
    name: 'id',
    description: 'ID of the note to archive',
    example: 1,
  })
  async archive(@Param('id') id: number): Promise<Note> {
    return this.notesService.archiveNote(id);
  }

  @Patch(':id/unarchive')
  @ApiParam({
    name: 'id',
    description: 'ID of the note to unarchive',
    example: 1,
  })
  async unarchive(@Param('id') id: number): Promise<Note> {
    return this.notesService.unarchiveNote(id);
  }

}
