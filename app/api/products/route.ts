import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';
import { v4 as uuidv4 } from 'uuid';

const FILE_NAME = 'products.json';

export async function GET() {
    const products = readData(FILE_NAME);
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const products = readData(FILE_NAME);

        const newProduct = {
            id: uuidv4(),
            ...body
        };

        products.push(newProduct);
        writeData(FILE_NAME, products);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
