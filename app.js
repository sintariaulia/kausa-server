const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path')
// Router
const aboutUsRouter = require('./routers/aboutus.router');
const kategoriRouter = require('./routers/kategoris');
const produkRouter = require('./routers/produks');
const userRouter = require('./routers/users');
const pesananRouter = require('./routers/pesanan.router');
const paymentRouter = require('./routers/payment.router');
const authRouter = require('./routers/auth.router');
// Tambahkan middleware untuk mengkonfigurasi parsing body request menjadi JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allow cross-origin resource sharing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// preview gambar
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome To Backend Kausa Kopi!')
})

// ROUTER LOCALHOST
app.use(aboutUsRouter);
app.use(kategoriRouter);
app.use(produkRouter);
app.use(userRouter);
app.use(pesananRouter);
app.use(paymentRouter);
app.use('/auth', authRouter);
// END ROUTER LOCALHOST

// Handle undefined routes
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

// Peryataan ini diletakkan sebelum penggunaan process.env.JWT_SECRET pada bagian lain kode
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Internal Server Error'
    }
  });
});

// Port Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});