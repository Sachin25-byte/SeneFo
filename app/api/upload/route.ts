import { NextResponse } from 'next/server';
import { getSupabase } from '@/utils/supabase';

export async function POST(request: Request) {
    try {
        const supabase = getSupabase();
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
        const buffer = await file.arrayBuffer();

        // Upload to Supabase Storage (Assumes a bucket named 'uploads' exists and is public)
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase Storage Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('uploads')
            .getPublicUrl(filename);

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
