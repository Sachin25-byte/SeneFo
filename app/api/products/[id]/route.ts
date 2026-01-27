import { NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase';

function mapProductToDB(data: any) {
    const mapped = { ...data };
    if (data.originalPrice !== undefined) mapped.original_price = data.originalPrice;
    if (data.discountedPrice !== undefined) mapped.discounted_price = data.discountedPrice;
    if (data.reviewsCount !== undefined) mapped.reviews_count = data.reviewsCount;
    if (data.reviews_count !== undefined) mapped.reviews_count = data.reviews_count;

    delete mapped.originalPrice;
    delete mapped.discountedPrice;
    delete mapped.reviewsCount;
    return mapped;
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = getSupabase();

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = getSupabase();

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabase();

    // Clean and map data
    const { id: _, created_at: __, ...updateData } = mapProductToDB(body);

    const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Supabase PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
