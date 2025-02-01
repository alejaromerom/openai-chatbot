import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ToolsService } from './tools.service';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private toolsService: ToolsService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }
  //STEP 1
  //The user request something to the chatbot
  async chat(message: string): Promise<string> {
    console.log('STEP 1', message);
    const tools = [
      {
        type: 'function' as const,
        function: {
          name: 'searchProducts',
          description: 'Search for products based on a query',
          parameters: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'The search query',
              },
            },
            required: ['query'],
          },
        },
      },
      {
        type: 'function' as const,
        function: {
          name: 'convertCurrency',
          description: 'Convert an amount from one currency to another',
          parameters: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                description: 'The amount to convert',
              },
              fromCurrency: {
                type: 'string',
                description: 'The currency to convert from',
              },
              toCurrency: {
                type: 'string',
                description: 'The currency to convert to',
              },
            },
            required: ['amount', 'fromCurrency', 'toCurrency'],
          },
        },
      },
    ];

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'developer',
            content: `A user asks: ${message}. You have the following functions available: 1. searchProducts(query) 2. convertCurrency(amount, fromCurrency, toCurrency). Indicate which function you want to use to solve the user's enquiry.`,
          },
          { role: 'user', content: message },
        ],
        tools,
        tool_choice: 'auto',
      });

      const responseMessage = response.choices[0].message;

      // STEP 2
      //We ask the LLM which function to use searchProducts or convertCurrency
      console.log('PASO 2');
      console.dir(responseMessage, { depth: null });

      // STEP 3
      //We use the function that the LLM told us to use for response to the user

      if (responseMessage.tool_calls?.[0]) {
        const toolCall = responseMessage.tool_calls[0];
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        let functionResult;
        if (functionName === 'searchProducts') {
          functionResult = await this.toolsService.searchProducts(
            functionArgs.query,
          );
        } else if (functionName === 'convertCurrency') {
          functionResult = await this.toolsService.convertCurrency(
            functionArgs.amount,
            functionArgs.fromCurrency,
            functionArgs.toCurrency,
          );
        }

        console.log('PASO 3');
        console.dir(functionResult, { depth: null });

        // STEP 4
        //We ask the LLM to formulate a final response to the user
        const content = `A user asks: ${message}. You have the following functions available: 1. searchProducts(query) 2. convertCurrency(amount, fromCurrency, toCurrency). You chose the function ${functionName} with arguments ${JSON.stringify(functionArgs)}. The result was: ${JSON.stringify(functionResult)}. Formulate a final response.`;
        console.log('PASO 4');
        console.dir(content, { depth: null });

        const secondResponse = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'developer',
              content,
            },
          ],
        });
        //STEP 5
        //We return the final response to the user
        console.log('PASO 4');
        console.dir(secondResponse.choices[0].message, { depth: null });

        return secondResponse.choices[0].message.content ?? '';
      }

      return responseMessage.content ?? '';
    } catch (error) {
      console.error('An error occurred:', error);
      return 'I apologize, but I encountered an error. Please try again later.';
    }
  }
}
