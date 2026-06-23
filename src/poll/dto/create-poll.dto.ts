import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createPollSchema = z.object({
  roomId: z.string().nonempty({ error: 'roomId can not be empty.' }),
  timetableId: z.string().nonempty({ error: 'timetableId can not be empty.' }),
  date: z.iso.datetime({ error: 'must be a valid date.' }),
  threshold: z.int().min(50).max(100).optional(),
  expiresAt: z.iso.datetime({ error: 'must be a valid date.' }),
  isLocked: z.boolean().optional(),
});

export const createPollBodySchema = createPollSchema.omit({
  roomId: true,
  timetableId: true,
});

export class CreatePollDto extends createZodDto(createPollSchema) {}

export class CreatePollBodyDto extends createZodDto(createPollBodySchema) {}
