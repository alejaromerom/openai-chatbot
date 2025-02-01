import { ApiProperty } from '@nestjs/swagger';
// This class represents the data transfer object for chat requests
export class ChatRequestDto {
  @ApiProperty({ description: 'The message to send to the chatbot' })
  message: string;
}
