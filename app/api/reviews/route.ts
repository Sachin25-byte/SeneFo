import { NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase';

function mapReviewToDB(data: any) {
    const mapped = { ...data };
    if (data.reviewsCount !== undefined) mapped.reviews_count = data.reviewsCount;
    if (data.totalComments !== undefined) mapped.total_comments = data.totalComments;

    delete mapped.reviewsCount;
    delete mapped.totalComments;

    if (mapped.id && String(mapped.id).length < 10) {
        delete mapped.id;
    }
    return mapped;
}

export async function GET() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('reviews')
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
        const dbData = mapReviewToDB(body);

        const { data, error } = await supabase
            .from('reviews')
            .insert([dbData])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
