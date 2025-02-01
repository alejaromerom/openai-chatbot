export class ProductDto {
  // This DTO is used to validate the product data
  constructor(
    public displayTitle: string,
    public embeddingText: string,
    public url: string,
    public imageUrl: string,
    public productType: string,
    public discount: number,
    public price: number,
    public variants: string,
    public createDate: Date,
  ) {}
}
