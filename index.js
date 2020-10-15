const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Hbr14I0gL9dBjcHGT4wiYN3Ms85LogwPqBMAgXUayArSUYWORyxpCQvpDuSX9ZRwRxDTPxQjzCGnrbeqdmwQSdN0036VBgD5T');


app.use(express.json());
app.use(cors());

app.post('/checkout', async (req,res) => {
    const {amount} = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:'usd'
        })
        res.status(200).send(paymentIntent.client_secret)
    } catch(err){
        res.status(500).send(err)
    }
    
})

app.listen(PORT , () => {
    console.log(`Server listening on PORT : ${PORT}`)
});