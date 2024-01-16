import Sale from "../models/sale.js";

export const addSale = async (req, res) => {
    try {
        const { month, sale } = req.body;
        const existingSale = await Sale.findOne({ month: req.body.month });
        if (existingSale) {
            await Sale.updateOne({ _id: existingSale._id }, { sale: existingSale.sale + sale });
            res.status(200).send(`Data updated successfully: ${existingSale.month}: ${existingSale.sale} (INR)`);
            return;
        }
        const _sale = await Sale({
            month,
            sale
        });
        await _sale.save();
        res.status(200).send(`New data added successfully`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const getSale = async (req, res) => {
    try {
        const sale = await Sale.find({});
        res.status(200).json(sale);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deleteSale = async (req, res) => {
}

export const updateSale = async (req, res) => {
}