-- Create Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  originalPrice TEXT,
  discountedPrice TEXT,
  rating FLOAT DEFAULT 5,
  reviewsCount INTEGER DEFAULT 0,
  discount TEXT,
  category TEXT,
  link TEXT DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  rating FLOAT DEFAULT 5,
  reviewsCount INTEGER DEFAULT 0,
  totalComments INTEGER DEFAULT 0,
  excerpt TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  excerpt TEXT,
  category TEXT,
  rating FLOAT DEFAULT 5,
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) - For now, we allow public read/write as this is a simple admin site
-- In a real app, you would restrict write access to authenticated users only.
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON reviews FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON blogs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON blogs FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON categories FOR DELETE USING (true);
