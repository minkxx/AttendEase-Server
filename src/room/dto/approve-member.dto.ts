import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const approveMemberSchema = z.object({
  roomId: z.string().nonempty('roomId must not be empty.'),
  memberId: z.string().nonempty('memberId must not be empty.'),
});

export class ApproveMemberDto extends createZodDto(approveMemberSchema) {}
