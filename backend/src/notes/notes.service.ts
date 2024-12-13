/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  create(note: Partial<Note>) {
    return this.noteRepository.save(note);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: number) {
    return this.noteRepository.findOne({ where: { id } });
  }

  update(id: number, note: Partial<Note>) {
    return this.noteRepository.update(id, note);
  }

  remove(id: number) {
    return this.noteRepository.delete(id);
  }
}
