import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateAttendanceSchema = z.object({
  userId: z.string().nonempty({ error: 'userId can not be empty.' }),
  timetableId: z.string().nonempty({ error: 'timetableId can not be empty.' }),
  date: z.iso.datetime({ error: 'must be a valid date.' }),
  status: z.enum(['PRESENT', 'ABSENT', 'CANCELLED']).optional(),
});

export const updateAttendanceBodySchema = updateAttendanceSchema.omit({
  userId: true,
  timetableId: true,
});

export class UpdateAttendanceDto extends createZodDto(updateAttendanceSchema) {}

export class UpdateAttendanceBodyDto extends createZodDto(
  updateAttendanceBodySchema,
) {}
