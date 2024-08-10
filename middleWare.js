const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Route to display the form
app.use('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" placeholder="Product Title">
      <input type="text" name="size" placeholder="Product Size">
      <button type="submit">Add Product</button>
    </form>
  `);
});

// Route to handle form submission
app.use('/product', (req, res, next) => {
  console.log(req.body); 
  res.redirect('/');
});

// Route for the homepage
app.use('/', (req, res, next) => {
  res.send('<h1>Hellooooo</h1>');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
