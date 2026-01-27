import { NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase';

// Helper to map camelCase (frontend) to snake_case (database)
function mapProductToDB(data: any) {
    const mapped = { ...data };
    if (data.originalPrice !== undefined) mapped.original_price = data.originalPrice;
    if (data.discountedPrice !== undefined) mapped.discounted_price = data.discountedPrice;
    if (data.reviewsCount !== undefined) mapped.reviews_count = data.reviewsCount;
    if (data.reviews_count !== undefined) mapped.reviews_count = data.reviews_count; // Handle both

    // Remove camelCase fields
    delete mapped.originalPrice;
    delete mapped.discountedPrice;
    delete mapped.reviewsCount;

    // If id is not a valid UUID, let Supabase generate it
    if (mapped.id && String(mapped.id).length < 10) {
        delete mapped.id;
    }

    return mapped;
}

export async function GET() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('products')
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
        const dbData = mapProductToDB(body);

        const { data, error } = await supabase
            .from('products')
            .insert([dbData])
            .select()
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
