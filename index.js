require("dotenv").config();
const express = require('express');
const db_worker = require('./db_worker');
const authToken = process.env.AUTH_TOKEN;
const app = express();
const port = 3000;


app.use(express.json());




// PRODUCTS 
// =============================================================================
app.post('/api/v1/products', authenticateToken, (req, res) => {
  const { page, limit, offset, sort, filter } = req.body;

  // Применение сортировки
  let sortedProducts = db_worker.select_products();

  if (sort) {
    sortedProducts.sort((a, b) => {
      if (sort === 'price') {
        return a.price - b.price;
      }
      // Другие критерии сортировки
    });
  }

  // Применение фильтрации
  let filteredProducts = sortedProducts;
  if (filter) {
    filteredProducts = sortedProducts.filter(product => {
      return product.category === filter;
      // Другие критерии фильтрации
    });
  }

  // Вычисление общего количества товаров
  const total = filteredProducts.length;

  // Применение пагинации
  const startIndex = (page - 1) * limit + parseInt(offset);
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  res.json(paginatedProducts);
});


app.get('/api/v1/products/:product_id', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);
    
    const product = db_worker.select_product(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    res.json(product);

});


app.get('/api/v1/products/:product_id/attributes', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_attributes(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
    

    res.json(product);
});


app.get('/api/v1/products/:product_id/images', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_images(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(product);
})


app.get('/api/v1/products/:product_id/relation_products', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_relation_products(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(product);
});


app.get('/api/v1/products/:product_id/reviews_brief', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_reviews_brief(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(product);
});


app.get('/api/v1/products/:product_id/reviews', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_reviews(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(product);
});


app.get('/api/v1/products/:product_id/tags', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);

    const product = db_worker.select_tags(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(product);
});

app.post('/api/v1/products/{product_id}/reviews', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);
    const {} = {};


});

app.get('/api/v1/sales', authenticateToken, (req, res) => {
    const product = db_worker.select_saleproducts();
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
});
// + sales 
// =============================================================================





// TAGS
// =============================================================================
app.get('/api/v1/tags', authenticateToken, (req, res) => {
    const result = db_worker.select_tags();
    if (!result) {
        return res.status(404).json({ error: 'Product not found' });
    }
    req.json(result);
});
// =============================================================================





// CART
// =============================================================================
app.get('api/v1/carts/:cart_id', authenticateToken, (req, res) => {
    const cart_id = parseInt(req.params.cart_id);
    let result = db_worker.get_cart(cart_id);
    res.json(result);
});


app.post('api/v1/carts/:cart_id', authenticateToken, (req, res) => {
    const cart_id = parseInt(req.params.cart_id);

});


app.put('api/v1/carts/:cart_id', authenticateToken, (req, res) => {

});


app.delete('api/v1/carts/:cart_id', authenticateToken, (req, res) => {

});
// =============================================================================





// BANNERS
// =============================================================================
app.get('/api/v1/banners/block/:block_id', authenticateToken, (req, res) => {
    const productId = parseInt(req.params.product_id);
    req.json("Not Realised yet");
    
});
// =============================================================================





// CATEGORY 
// =============================================================================
app.get('/api/v1/categories', authenticateToken, (req, res) => {
    req.json("Not Realised yet");
});
// =============================================================================






// СUSTOMER
// =============================================================================
app.get('/api/v1/customers/:customer_id', authenticateToken, (req, res) => {
    const customer_id = parseInt(req.params.customer_id);
    const result = db_worker.get_customer(customer_id);
    req.json(result)
});


app.get('/api/v1/customers/:customer_id/orders', authenticateToken, (req, res) => {

});
// =============================================================================

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});





// Middleware для проверки авторизации
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token !== `Token ${authToken}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

