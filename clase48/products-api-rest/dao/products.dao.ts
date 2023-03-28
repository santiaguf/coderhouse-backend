import type { Product } from '../types/product.ts';

const products:Product[] = [];

export const findProductById = (id: number): Product => {
    let product: Product = <Product>products.find((p:Product) => p.id === id);
    return product || {}
}

export const getProducts = (): Product[] => {
    return products;
}

export const addProduct = (name: string, description: string, price: number): Product => {
    let product:Product = {
        id: products.length ? (products[products.length - 1].id + 1) : 1,
        name,
        description,
        price
    }
    products.push(product);
    return product;
};

export const updateProduct = (id: number, name: string, description: string, price: number): Product => {
    let productToUpdate:Product = {id, name, description, price};
    let index = products.findIndex((p:Product) => p.id === id);

    if (index >= 0) {
        products.splice(index, 1, productToUpdate);
    }
    return productToUpdate;
}

export const deleteProduct = (id: number): Product => {
    let index = products.findIndex((p:Product) => p.id === id);
    let product:Product = products[index];
    if (index >= 0) {
        products.splice(index, 1);
    }
    return product;
}