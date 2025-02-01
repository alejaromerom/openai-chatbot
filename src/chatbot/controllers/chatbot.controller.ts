import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from '../services/openai.service';
import { ChatRequestDto } from '../dto/chat-request.dto';
import { ChatResponseDto } from '../dto/chat-response.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private openAIService: OpenAIService) {}

  @Post()
  async chat(@Body() chatRequestDto: ChatRequestDto): Promise<ChatResponseDto> {
    const response = await this.openAIService.chat(chatRequestDto.message);
    return new ChatResponseDto(response);
  }
}
