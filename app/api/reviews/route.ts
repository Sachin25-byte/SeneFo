import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';
import { v4 as uuidv4 } from 'uuid';

const FILE_NAME = 'reviews.json';

export async function GET() {
    const reviews = readData(FILE_NAME);
    return NextResponse.json(reviews);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const reviews = readData(FILE_NAME);

        const newReview = {
            id: uuidv4(),
            ...body
        };

        reviews.push(newReview);
        writeData(FILE_NAME, reviews);

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
