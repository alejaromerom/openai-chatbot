export class ProductDto {
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
