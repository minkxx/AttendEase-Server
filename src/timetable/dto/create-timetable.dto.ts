import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createTimetableSchema = z.object({
  roomId: z.string().nonempty({ error: 'roomId can not be empty.' }),
  subjectName: z.string().nonempty({ error: 'subjectName can not be empty.' }),
  dayOfWeek: z
    .int()
    .min(1, { error: 'dayOfWeek must be a minimum value of 1.' })
    .max(7, { error: 'dayOfWeek must be a maximum value of 7.' }),
  startTime: z.string().nonempty({ error: 'startTime can not be empty.' }),
  endTime: z.string().nonempty({ error: 'endTime can not be empty.' }),
  latitude: z
    .float32({ error: 'latitude must be a decimanl value.' })
    .optional(),
  longitude: z
    .float32({ error: 'longitude must be a decimanl value.' })
    .optional(),
  radius: z.float32({ error: 'radius must be a decimanl value.' }).optional(),
});

export const createTimetableBodySchema = createTimetableSchema.omit({
  roomId: true,
});

export class CreateTimetableDto extends createZodDto(createTimetableSchema) {}

export class CreateTimetableBodyDto extends createZodDto(
  createTimetableBodySchema,
) {}
