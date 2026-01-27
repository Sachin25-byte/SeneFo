import { NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase';

export async function GET() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = getSupabase();
        const body = await request.json();

        // Clean ID if needed
        if (body.id && String(body.id).length < 10) {
            delete body.id;
        }

        // Add default fields if missing and ensure types
        const blogData = {
            ...body,
            rating: body.rating ? Number(body.rating) : 5,
            author: body.author || 'Admin',
            date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        const { data, error } = await supabase
            .from('blogs')
            .insert([blogData])
            .select()
            .single();

        if (error) {
            console.error('Supabase Blog Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Server Blog Error:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
