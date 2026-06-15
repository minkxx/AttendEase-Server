import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createRoomSchema = z.object({
  name: z.string().min(2, 'Name is too short.'),
});

export class CreateRoomDto extends createZodDto(createRoomSchema) {}
