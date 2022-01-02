import Product from '@/types/Product';

export default interface ValueCollection {
    names: string[];
    defaults: Product[];
    measures: ['piece', 'kg'];
}
