# OpenAI Chatbot

This project is a chatbot developed with NestJS that uses the OpenAI API to respond to user queries. The chatbot can search for products and convert currencies.

## Installation

1. Clone the repository:
   ```bash
   git clone <REPOSITORY_URL>
   cd openai-chatbot
   ```

## Project setup

2. Install the dependencies

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev



```

## Configure the environment variables in the .env

OPENAI_API_KEY=your_openai_api_key
OPEN_EXCHANGE_RATES_API_KEY=your_open_exchange_rates_api_key

## API Documentation

The API documentation is automatically generated with Swagger. To access the documentation, start the server and navigate to http://localhost:3000/api

## Code Structure

## Controllers

- src/chatbot/controllers/chatbot.controller.ts: Controller that handles chat requests.

## Services

- src/chatbot/services/openai.service.ts: Service that interacts with the OpenAI API.
- src/chatbot/services/tools.service.ts: Service that provides additional tools like currency conversion.

## DAO

- src/chatbot/dao/product.dao.ts: Data access for products.

## DTOS

- src/chatbot/dto/chat-request.dto.ts: DTO for chat requests.
- src/chatbot/dto/chat-response.dto.ts: DTO for chat responses.
- src/chatbot/dto/product.dto.ts: DTO for products.

# Making a Request to the API

To make a request to the chatbot API, you can use curl or any HTTP client tool like Postman. Here is an example using curl:

## Chat Endpoint

```bash
- URL: http://localhost:3000/chatbot
- Method: POST
```

## Request Body:

```bash
{
"message": "Can you search for products related to 'laptop'?"
}
```

## Example Request with curl:

```bash
curl -X POST http://localhost:3000/chatbot \
 -H "Content-Type: application/json" \
 -d '{
"message": "Can you search for products related to 'laptop'?"
}'
```

## Expected Response:

```bash
{
"response": "Here are some products related to 'laptop': ..."
}
```

## Contributions

Contributions are welcome. Please open an issue or a pull request to discuss any changes you would like to make.
