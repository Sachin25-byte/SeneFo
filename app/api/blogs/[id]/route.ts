import { NextResponse } from 'next/server';
import { readData, writeData } from '@/utils/data';

const FILE_NAME = 'blogs.json';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const blogs = readData(FILE_NAME);
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);

    if (blogs.length === filteredBlogs.length) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    writeData(FILE_NAME, filteredBlogs);

    return NextResponse.json({ success: true });
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const blogs = readData(FILE_NAME);
    const blog = blogs.find((b: any) => b.id === id);

    if (!blog) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const blogs = readData(FILE_NAME);

    const index = blogs.findIndex((b: any) => b.id === id);

    if (index === -1) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...body };
    writeData(FILE_NAME, blogs);

    return NextResponse.json(blogs[index]);
}
