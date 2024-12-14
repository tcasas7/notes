/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../note.entity';
import { Tag } from '../tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(note: Partial<Note>): Promise<Note> {
    const { tags, ...noteData } = note;
  
    
    const tagEntities = await Promise.all(
      tags.map(async (tag: Tag) => {
        const existingTag = await this.tagRepository.findOne({ where: { name: tag.name } });
        if (existingTag) {
          return existingTag;
        }
        return this.tagRepository.save(tag); 
      }),
    );
  
    
    const newNote = this.noteRepository.create({ ...noteData, tags: tagEntities });
    return this.noteRepository.save(newNote);
  }
  
  findAll(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['tags'] });
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOne({ where: { id }, relations: ['tags'] });
  }

  async update(id: number, note: Partial<Note>): Promise<void> {
    const { tags, ...noteData } = note;

    
    const existingNote = await this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!existingNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    if (tags) {
     
      const tagEntities = await Promise.all(
        tags.map(async (tag: Tag) => {
          const existingTag = await this.tagRepository.findOne({ where: { name: tag.name } });
          return existingTag || this.tagRepository.save(tag);
        }),
      );

   
      existingNote.tags = tagEntities;
    }

    
    Object.assign(existingNote, noteData);

    await this.noteRepository.save(existingNote); 
  }

  async remove(id: number): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    await this.noteRepository.delete(id);
  }

  async archiveNote(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    note.isArchived = true;
    return this.noteRepository.save(note);
  }

  async unarchiveNote(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    note.isArchived = false;
    return this.noteRepository.save(note);
  }

  async getAllNotes(archived: boolean): Promise<Note[]> {
    return this.noteRepository.find({ where: { isArchived: archived }, relations: ['tags'] });
  }

}
