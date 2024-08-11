const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRouters = require('./routes/admin.js');
const shopRouters = require('./routes/shop.js')

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin',adminRouters);
app.use('/shop',shopRouters);

app.use((req, res, next) => {
  res.status(404).send('<h1>Error Page not found</h1>');
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
