import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OpenAIService } from '../services/openai.service';
import { ChatRequestDto } from '../dto/chat-request.dto';
import { ChatResponseDto } from '../dto/chat-response.dto';

// This controller is responsible for handling incoming chat requests and sending responses using decorators
@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private openAIService: OpenAIService) {}

  @Post()
  @ApiOperation({ summary: 'Chat with the bot' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: ChatResponseDto,
  })
  async chat(@Body() chatRequestDto: ChatRequestDto): Promise<ChatResponseDto> {
    const response = await this.openAIService.chat(chatRequestDto.message);
    return new ChatResponseDto(response);
  }
}
