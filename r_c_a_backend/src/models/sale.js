import mongoose from 'mongoose';

const saleSchema = mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    sale: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }
);

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;