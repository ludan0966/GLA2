document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category-filter');
  const sortBy = document.getElementById('sort-by');
  let products = [];

  function fetchData() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        products = data;
        // Default sorting by price in ascending order
        products.sort((a, b) => a.price - b.price);
        displayProducts(products);
      })
      .catch(error => console.error('Error fetching data:', error));
  }


  function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');

      const productItem = document.createElement('div');
      productItem.classList.add('product');
      productItem.innerHTML = `
        <h2>${product.title}</h2>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
        <p>Rating: ${product.rating.rate}/5.0 (${product.rating.count} reviews)</p>
      `;

      const productImage = document.createElement('div')
      const img = document.createElement('img');
      img.src = product.image;
      img.width = '200';
      img.style.display = 'block';
      img.style.margin = '0 auto';
      productImage.appendChild(img);

      productContainer.appendChild(productItem);
      productContainer.appendChild(productImage);
      productList.appendChild(productContainer);
    });
  }

  categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    const sortDirection = sortBy.value;
    const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

    if (sortDirection === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
  });



  sortBy.addEventListener('change', () => {
    const sortDirection = sortBy.value;
    const selectedCategory = categoryFilter.value;
    let sortedProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
    if (sortDirection === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);
  });

  fetchData();
});