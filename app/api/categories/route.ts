import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';
import { v4 as uuidv4 } from 'uuid';

const FILE_NAME = 'categories.json';

export async function GET() {
    const categories = readData(FILE_NAME);
    return NextResponse.json(categories);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const categories = readData(FILE_NAME);

        const newCategory = {
            id: uuidv4(),
            ...body
        };

        categories.push(newCategory);
        writeData(FILE_NAME, categories);

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
