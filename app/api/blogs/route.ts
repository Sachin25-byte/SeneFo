import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';
import { v4 as uuidv4 } from 'uuid';

const FILE_NAME = 'blogs.json';

export async function GET() {
    const blogs = readData(FILE_NAME);
    return NextResponse.json(blogs);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const blogs = readData(FILE_NAME);

        const newBlog = {
            id: uuidv4(),
            ...body
        };

        blogs.push(newBlog);
        writeData(FILE_NAME, blogs);

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
