import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log('🚀 Starting migration to Supabase...');

    const dataFiles = [
        { file: 'products.json', table: 'products' },
        { file: 'reviews.json', table: 'reviews' },
        { file: 'blogs.json', table: 'blogs' },
        { file: 'categories.json', table: 'categories' }
    ];

    for (const item of dataFiles) {
        console.log(`\n📦 Migrating ${item.file} to table "${item.table}"...`);

        try {
            const filePath = path.join(process.cwd(), 'data', item.file);
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️ File ${item.file} not found, skipping.`);
                continue;
            }

            const rawData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(rawData);

            if (!Array.isArray(data) || data.length === 0) {
                console.log(`ℹ️ No data in ${item.file}, skipping.`);
                continue;
            }

            // Map frontend fields (camelCase) to database fields (snake_case)
            const mappedData = data.map(record => {
                const newRecord = { ...record };

                // Common cleaning: Remove numeric IDs that are not UUIDs
                // BUT only if they are simple numbers like "1", "2"
                // If it's a real UUID (length 36), keep it.
                if (record.id && (String(record.id).length < 10)) {
                    delete newRecord.id;
                }

                // Table specific mapping
                if (item.table === 'products') {
                    if (record.discountedPrice !== undefined) newRecord.discounted_price = record.discountedPrice;
                    if (record.originalPrice !== undefined) newRecord.original_price = record.originalPrice;
                    if (record.reviewsCount !== undefined) newRecord.reviews_count = record.reviewsCount;

                    delete newRecord.discountedPrice;
                    delete newRecord.originalPrice;
                    delete newRecord.reviewsCount;
                }

                if (item.table === 'reviews') {
                    if (record.reviewsCount !== undefined) newRecord.reviews_count = record.reviewsCount;
                    if (record.totalComments !== undefined) newRecord.total_comments = record.totalComments;

                    delete newRecord.reviewsCount;
                    delete newRecord.totalComments;
                }

                if (item.table === 'blogs') {
                    if (record.reviewsCount !== undefined) newRecord.reviews_count = record.reviewsCount;
                    delete newRecord.reviewsCount;
                }

                return newRecord;
            });

            console.log(`⏳ Inserting ${mappedData.length} items...`);
            const { error } = await supabase.from(item.table).upsert(mappedData);

            if (error) {
                console.error(`❌ Error migrating ${item.file}:`, error.message);
                console.log('Sample record after mapping:', JSON.stringify(mappedData[0], null, 2));
            } else {
                console.log(`✅ Successfully migrated ${mappedData.length} items.`);
            }
        } catch (err) {
            console.error(`❌ Failed to migrate ${item.file}:`, err);
        }
    }

    console.log('\n✨ Migration finished.');
}

migrate();
