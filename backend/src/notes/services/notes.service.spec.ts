/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { Tag } from '../tag.entity';


const mockNotesRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockTagsRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('NotesService', () => {
  let service: NotesService;
  let notesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: mockNotesRepository() },
        { provide: getRepositoryToken(Tag), useValue: mockTagsRepository() },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    notesRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  describe('archiveNote', () => {
    it('should archive a note', async () => {
      const mockNote = { id: 1, isArchived: false };
      notesRepository.findOne.mockResolvedValue(mockNote);
      notesRepository.save.mockResolvedValue({ ...mockNote, isArchived: true });

      const result = await service.archiveNote(1);

      expect(notesRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(notesRepository.save).toHaveBeenCalledWith({ ...mockNote, isArchived: true });
      expect(result.isArchived).toEqual(true);
    });

    it('should throw an error if note is not found', async () => {
      notesRepository.findOne.mockResolvedValue(null);

      await expect(service.archiveNote(1)).rejects.toThrow('Note with ID 1 not found.');
    });
  });

  describe('unarchiveNote', () => {
    it('should unarchive a note', async () => {
      const mockNote = { id: 1, isArchived: true };
      notesRepository.findOne.mockResolvedValue(mockNote);
      notesRepository.save.mockResolvedValue({ ...mockNote, isArchived: false });

      const result = await service.unarchiveNote(1);

      expect(notesRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(notesRepository.save).toHaveBeenCalledWith({ ...mockNote, isArchived: false });
      expect(result.isArchived).toEqual(false);
    });

    it('should throw an error if note is not found', async () => {
      notesRepository.findOne.mockResolvedValue(null);

      await expect(service.unarchiveNote(1)).rejects.toThrow('Note with ID 1 not found.');
    });
  });

  describe('getAllNotes', () => {
    it('should return all notes with the correct archived filter', async () => {
      const mockNotes = [
        { id: 1, isArchived: true },
        { id: 2, isArchived: false },
      ];
      notesRepository.find.mockResolvedValue([mockNotes[1]]);

      const result = await service.getAllNotes(false);

      expect(notesRepository.find).toHaveBeenCalledWith({ where: { isArchived: false }, relations: ['tags'] });
      expect(result).toEqual([mockNotes[1]]);
    });
  });
});
