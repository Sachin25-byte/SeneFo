-- 1. पुरानी टेबल्स को पूरी तरह साफ़ करें
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 2. UUID एक्सटेंशन इनेबल करें
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. PRODUCTS टेबल
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  original_price TEXT,
  discounted_price TEXT,
  rating FLOAT DEFAULT 5,
  reviews_count INTEGER DEFAULT 0,
  discount TEXT,
  category TEXT,
  link TEXT DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS टेबल
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  rating FLOAT DEFAULT 5,
  reviews_count INTEGER DEFAULT 0,
  total_comments INTEGER DEFAULT 0,
  excerpt TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BLOGS TABLE
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  excerpt TEXT,
  category TEXT,
  author TEXT DEFAULT 'Admin',
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. सभी टेबल्स पर सिक्योरिटी (RLS) बंद करें
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
