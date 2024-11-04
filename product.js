const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
        
    },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'Cena mora biti pozitivna'] 
    },
    description: { 
        type: String, 
        default: 'Opis nije dostupan' 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Building', 'Tools','Home','Other'], 
        default: 'Other' 
    },
    imageUrl: { 
        type: String, 
        default: '' 
    },
    stock: { 
        type: Number, 
        required: true,
        min: [0, 'Zaliha ne može biti negativna'],
        default: 1 
    },
    ratings: { 
        type: [Number], 
        default: []  
    },
    averageRating: { 
        type: Number, 
        default: 4,
        min: 0,
        max: 5 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});


productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


productSchema.virtual('computedAverageRating').get(function() {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    return (sum / this.ratings.length).toFixed(1); 
});

module.exports = mongoose.model('Product', productSchema);

