const stripe= require("stripe")("sk_test_51Lpv6ASFtiEt6mEaJIEKXnQj3vy2PI5dyH0vJd5Rdf45wwbYTuuBu8mer2jYtxo0sIYtjp21VDpvXdF2DX3lVvKI00Q9ZRjIFR")
const { v4: uuidv4 } = require('uuid')

exports.makepayment = (req, res) => {
   const {products,token}=req.body
   console.log("PRODUCTS ", products);

   let amount=0
   products.map(p=>{
    amount= amount+p.price
   })

  const idempotencyKey= uuidv4()

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer=>{
    stripe.charges.create({
        amount:amount*100,
        currency:'usd',
        customer:customer.id,
        receipt_email:token.email,
        shipping:{
            name:token.card.name
        }
    },{idempotencyKey})
    .then(result=>res.status(200).json(result))
    .catch(err=> console.log(err))

  })
  };