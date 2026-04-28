import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/senefo')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});
const User = mongoose.model('User', UserSchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 }
}, { timestamps: true });
const Product = mongoose.model('Product', ProductSchema);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array,
  totalAmount: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });
const Order = mongoose.model('Order', OrderSchema);

// Middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied.' });
    }
    next();
  });
};

// Routes - Auth
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // For demo purposes, create default admin if not exists
    let admin = await User.findOne({ email });
    if (!admin) {
      if (email === 'admin@senefo.com' && password === 'admin123') {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await User.create({ name: 'Admin', email, password: hashedPassword, role: 'admin' });
      } else {
        return res.status(401).send({ error: 'Invalid credentials' });
      }
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'fallback_secret');
    res.send({ user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes - Dashboard Stats
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    res.send({ totalProducts, totalOrders, totalUsers });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes - Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/products', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/api/products/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes - Orders
app.get('/api/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes - Users
app.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
