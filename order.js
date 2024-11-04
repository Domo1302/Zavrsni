const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: ID proizvoda
 *         name:
 *           type: string
 *           description: Ime proizvoda
 *         price:
 *           type: number
 *           description: Cena proizvoda
 *         description:
 *           type: string
 *           description: Opis proizvoda
 *         category:
 *           type: string
 *           description: Kategorija proizvoda
 *           enum: [Electronics, Clothing, Books, Home, Beauty, Sports, Other]
 *         imageUrl:
 *           type: string
 *           description: URL slike proizvoda
 *         stock:
 *           type: number
 *           description: Količina na stanju
 *         ratings:
 *           type: array
 *           items:
 *             type: number
 *           description: Ocene proizvoda
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Datum kreiranja
 */
const ProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});


const OrderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSchema], // 
  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); 
  next();
});

module.exports = mongoose.model('Order', OrderSchema); 