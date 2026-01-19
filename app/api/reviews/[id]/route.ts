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
