import { Injectable } from '@nestjs/common';
import { ProductDao } from '../dao/product.dao';
import { ProductDto } from '../dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

// This interface represents the response from the exchange rates API
interface ExchangeRateResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}
// This service provides tools for the chatbot
@Injectable()
export class ToolsService {
  constructor(
    private configService: ConfigService,
    private productDao: ProductDao,
    private httpService: HttpService,
  ) {}
  // This method searches for products based on a query

  searchProducts(query: string): ProductDto[] {
    return this.productDao.findByName(query);
  }
  // This method converts an amount from one currency to another
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<any> {
    const response = await this.getExchangeRates();
    console.log('START CONVERT CURRENCY');
    const exchangeRates = response.data.rates;
    console.log('exchangeRates', exchangeRates);
    console.log('amount', amount);
    console.log('fromCurrency', fromCurrency);
    console.log('toCurrency', toCurrency);
    // Here we check if the currencies are supported
    if (!(fromCurrency in exchangeRates) || !(toCurrency in exchangeRates)) {
      throw new Error('Unsupported currency');
    }

    const convertedAmount =
      (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    console.log('convertedAmount', convertedAmount);
    return Number(convertedAmount.toFixed(2));
  }
  // This method fetches the latest exchange rates

  async getExchangeRates(): Promise<AxiosResponse<ExchangeRateResponse>> {
    try {
      const appId = this.configService.get<string>(
        'OPEN_EXCHANGE_RATES_API_KEY',
      );
      if (!appId) {
        throw new Error('API key not configured');
      }
      // Here we fetch the exchange rates from the API
      const response = await firstValueFrom(
        this.httpService.get<ExchangeRateResponse>(
          `https://openexchangerates.org/api/latest.json?app_id=${appId}`,
        ),
      );

      return response;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to fetch exchange rates');
    }
  }
}
