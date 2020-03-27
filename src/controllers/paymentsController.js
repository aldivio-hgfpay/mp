const MercadoPago = require('mercadopago');

const getFullUrl = (req) => {
  const url = req.protocol + '://' + req.get('host');
  console.log("foi chamado")
  return url;
}

module.exports = {
  async checkout(req, res) {

    // console.log(process.env)
    MercadoPago.configure({
      sandbox: true,
      access_token: 'TEST-2854145326156788-032711-b992631380b279aa60c9e255400f2966-539527007'
    });

    const { id, email, description, amount } = req.params;

    //Create purchase item object template
    const purchaseOrder = {
      items: [
        item = {
          id: id,
          title: description,
          description: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        email: email
      },
      auto_return: "all",
      external_reference: id,
      back_urls: {
        success: getFullUrl(req) + "/payments/success",
        pending: getFullUrl(req) + "/payments/pending",
        failure: getFullUrl(req) + "/payments/failure",
      }
    }

    //Generate init_point to checkout
    try {
      const preference = await MercadoPago.preferences.create(purchaseOrder);
      return res.redirect(`${preference.body.init_point}`);
    } catch (err) {
      return res.send(err.message);
    }
  }
}