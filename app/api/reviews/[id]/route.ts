import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';

const FILE_NAME = 'reviews.json';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const items = readData(FILE_NAME);
    const filteredItems = items.filter((item: any) => item.id !== id);

    if (items.length === filteredItems.length) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    writeData(FILE_NAME, filteredItems);
    return NextResponse.json({ success: true });
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const items = readData(FILE_NAME);
    const item = items.find((i: any) => i.id === id);

    if (!item) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(item);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const items = readData(FILE_NAME);

    const index = items.findIndex((i: any) => i.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...body };
    writeData(FILE_NAME, items);

    return NextResponse.json(items[index]);
}
