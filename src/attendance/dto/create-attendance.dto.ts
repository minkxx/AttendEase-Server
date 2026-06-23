import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createAttendanceSchema = z.object({
  userId: z.string().nonempty({ error: 'userId can not be empty.' }),
  timetableId: z.string().nonempty({ error: 'timetableId can not be empty.' }),
  date: z.iso.datetime({ error: 'must be a valid date.' }),
  status: z.enum(['PRESENT', 'ABSENT', 'CANCELLED']).optional(),
  isManual: z.boolean({ error: 'must be a boolean value.' }).optional(),
});

export const createAttendanceBodySchema = createAttendanceSchema.omit({
  userId: true,
  timetableId: true,
});

export class CreateAttendanceDto extends createZodDto(createAttendanceSchema) {}

export class CreateAttendanceBodyDto extends createZodDto(
  createAttendanceBodySchema,
) {}
