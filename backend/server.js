import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'senefo_secret_key_2024';
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ── In-Memory Data Store ──────────────────────────────────────────────────────
const makeId = () => Math.random().toString(36).slice(2, 10);

// Seed admin user (password: admin123)
const ADMIN_HASH = await bcrypt.hash('admin123', 10);
const users = [
  { _id: makeId(), name: 'Admin', email: 'admin@senefo.com', password: ADMIN_HASH, role: 'admin' }
];

const products = [
  { _id: makeId(), name: 'Floral Summer Dress',   price: 1299, category: 'Dresses',   image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', description: 'Light floral dress perfect for summer.',  stock: 20, createdAt: new Date() },
  { _id: makeId(), name: 'Denim Jacket',           price: 1899, category: 'Jackets',   image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', description: 'Classic denim jacket, slim fit.',          stock: 15, createdAt: new Date() },
  { _id: makeId(), name: 'Boho Maxi Skirt',        price: 999,  category: 'Skirts',    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', description: 'Flowy boho style maxi skirt.',            stock: 30, createdAt: new Date() },
  { _id: makeId(), name: 'Crop Top (Pink)',         price: 699,  category: 'Tops',      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400', description: 'Trendy pink crop top.',                   stock: 50, createdAt: new Date() },
];

const orders = [
  { _id: makeId(), userId: { name: 'Priya Sharma', email: 'priya@example.com' }, items: [{ name: 'Floral Summer Dress', qty: 1 }], totalAmount: 1299, status: 'Delivered', createdAt: new Date() },
  { _id: makeId(), userId: { name: 'Ananya Roy',   email: 'ananya@example.com' }, items: [{ name: 'Denim Jacket', qty: 2 }],       totalAmount: 3798, status: 'Pending',   createdAt: new Date() },
];

// ── Middleware ────────────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied.' });
    next();
  });
};

// ── Routes - Auth ─────────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = users.find(u => u.email === email && u.role === 'admin');
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET);
    res.json({ user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Routes - Dashboard Stats ──────────────────────────────────────────────────
app.get('/api/admin/stats', adminAuth, (req, res) => {
  res.json({
    totalProducts: products.length,
    totalOrders:   orders.length,
    totalUsers:    users.filter(u => u.role === 'user').length,
    revenue:       orders.reduce((sum, o) => sum + o.totalAmount, 0)
  });
});

// ── Routes - Products ─────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  res.json([...products].sort((a, b) => b.createdAt - a.createdAt));
});

app.post('/api/products', adminAuth, (req, res) => {
  const product = { _id: makeId(), ...req.body, createdAt: new Date() };
  products.push(product);
  res.status(201).json(product);
});

app.put('/api/products/:id', adminAuth, (req, res) => {
  const idx = products.findIndex(p => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

app.delete('/api/products/:id', adminAuth, (req, res) => {
  const idx = products.findIndex(p => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(idx, 1);
  res.json({ message: 'Product deleted' });
});

// ── Routes - Orders ───────────────────────────────────────────────────────────
app.get('/api/orders', adminAuth, (req, res) => {
  res.json([...orders].sort((a, b) => b.createdAt - a.createdAt));
});

// ── Routes - Users ────────────────────────────────────────────────────────────
app.get('/api/users', adminAuth, (req, res) => {
  res.json(users.filter(u => u.role === 'user').map(({ password, ...u }) => u));
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} (in-memory mode — no MongoDB needed)`));
