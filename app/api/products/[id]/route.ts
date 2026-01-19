import { NextResponse } from 'next/server';
import { readData, writeData, dataPath } from '@/utils/data';
import path from 'path';

const FILE_NAME = 'products.json';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // console.log(`Attempting to delete product with ID: ${id}`);

    const products = readData(FILE_NAME);
    const filteredProducts = products.filter((p: any) => p.id !== id);

    if (products.length === filteredProducts.length) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    writeData(FILE_NAME, filteredProducts);

    return NextResponse.json({ success: true });
}


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const products = readData(FILE_NAME);
    const product = products.find((p: any) => p.id === id);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const products = readData(FILE_NAME);

    const index = products.findIndex((p: any) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[index] = { ...products[index], ...body };
    writeData(FILE_NAME, products);

    return NextResponse.json(products[index]);
}
