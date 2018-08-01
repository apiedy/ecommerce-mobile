export class ProductListing {
    constructor(
        public name: string,
        public number: number,
        public seller: string,
        public price?: number,
        public tradeFor?: string
    ) { }
}