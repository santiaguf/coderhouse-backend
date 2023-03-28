import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/product.ts";
import * as productsDao from "../dao/products.dao.ts";

export const findProduct = async (ctx: Context) => {
    try {
        let products: Product[] = await productsDao.getProducts();
        ctx.response.body = products;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { message: err.message };
        }
};

export const findProductById = async (ctx: Context) => {
    const productId = Number(helpers.getQuery(ctx, { mergeParams: true }).id);
    try {
        let product: Product = await productsDao.findProductById(productId);
        ctx.response.body = product;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { message: err.message };
    }
};

export const addProduct = async (ctx: Context) => {
    try {
        const {name, description, price} = await ctx.request.body().value;

        let product: Product = await productsDao.addProduct(name, description, price);
        ctx.response.body = product;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { message: err.message };
    }
};

export const updateProduct = async (ctx: Context) => {
    try {
        const productId = Number(helpers.getQuery(ctx, { mergeParams: true }).id);
        const {name, description, price} = await ctx.request.body().value;
        let product: Product = await productsDao.updateProduct(productId, name, description, price);
        ctx.response.body = product;
    }   catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { message: err.message };
    }
};

export const deleteProduct = async (ctx: Context) => {
    const productId = Number(helpers.getQuery(ctx, { mergeParams: true }).id);
    try {
        const product: Product = await productsDao.deleteProduct(productId);
        ctx.response.body = product;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { message: err.message };
    }
};