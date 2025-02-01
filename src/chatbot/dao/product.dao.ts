import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductDao {
  private products: ProductDto[];
  private readonly logger = new Logger(ProductDao.name);

  constructor() {
    try {
      const fileContent = readFileSync('products_list.csv', {
        encoding: 'utf-8',
      });
      this.products = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        quote: '"',
        escape: '\\',
        delimiter: ',',
        relax_column_count: true,
        relax_quotes: true,
        skip_records_with_error: true,
        on_record: (record, { lines }) => {
          try {
            return new ProductDto(
              record.displayTitle,
              record.embeddingText,
              record.url,
              record.imageUrl,
              record.productType,
              parseFloat(record.discount) || 0,
              parseFloat(record.price) || 0,
              record.variants,
              new Date(record.createDate),
            );
          } catch (error) {
            this.logger.warn(
              `Error parsing record at line ${lines}: ${error.message}`,
            );
            return null;
          }
        },
      }).filter((record) => record !== null);

      this.logger.log(`Loaded ${this.products.length} products successfully`);
    } catch (error) {
      this.logger.error(`Failed to load products: ${error.message}`);
      this.products = [];
    }
  }

  findAll(): ProductDto[] {
    return this.products;
  }

  findByName(query: string): ProductDto[] {
    return this.products.filter(
      (product) =>
        product.displayTitle.toLowerCase().includes(query.toLowerCase()) ||
        product.embeddingText.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
