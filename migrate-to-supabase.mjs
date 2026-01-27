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

    const dataFiles = ['products.json', 'reviews.json', 'blogs.json', 'categories.json'];

    for (const file of dataFiles) {
        const tableName = file.replace('.json', '');
        console.log(`\n📦 Migrating ${file} to table "${tableName}"...`);

        try {
            const filePath = path.join(process.cwd(), 'data', file);
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️ File ${file} not found, skipping.`);
                continue;
            }

            const rawData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(rawData);

            if (!Array.isArray(data) || data.length === 0) {
                console.log(`ℹ️ No data in ${file}, skipping.`);
                continue;
            }

            console.log(`⏳ Inserting ${data.length} items...`);
            const { error } = await supabase.from(tableName).upsert(data);

            if (error) {
                console.error(`❌ Error migrating ${file}:`, error.message);
            } else {
                console.log(`✅ Successfully migrated ${data.length} items.`);
            }
        } catch (err) {
            console.error(`❌ Failed to migrate ${file}:`, err);
        }
    }

    console.log('\n✨ Migration finished.');
}

migrate();
