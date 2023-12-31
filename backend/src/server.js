const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');
const app = express();
const PORT =  8000;
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: '123456', 
  resave: false,
  saveUninitialized: true,
}));

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4kuzydd.mongodb.net/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
