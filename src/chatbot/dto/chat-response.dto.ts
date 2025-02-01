import { ApiProperty } from '@nestjs/swagger';
// This class represents the data transfer object for chat responses
export class ChatResponseDto {
  @ApiProperty({ description: 'The response from the chatbot' })
  response: string;

  constructor(response: string) {
    this.response = response;
  }
}
