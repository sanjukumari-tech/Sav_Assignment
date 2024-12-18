import React, { useState } from 'react';

const LeftMenu = ({ products }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categories = [...new Set(products.map(product => product.category))];
  const prices = ['50-100', '101-200', '201-300', '301-400'];
  const ratings = [1, 2, 3, 4, 5];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

 const filteredProducts = products.filter(product => {
    const priceRange = selectedPrices.some(price => {
      const [min, max] = price.split('-').map(Number);
      return product.price >= min && product.price <= max;
    });

    return (
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (selectedPrices.length === 0 || priceRange) &&
      (selectedRatings.length === 0 || selectedRatings.includes(Math.round(product.rating.rate)))
    );
  });

  return (
    <div style={{scrollbarWidth:"auto"}}>
      <h3>All categories</h3>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={category}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </div>
      ))}

      <hr />
      <h3>Price</h3>
      {prices.map((price, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={price}
            onChange={() => handlePriceChange(price)}
          />
          {price}
        </div>
      ))}

      <hr />
      <h3>Ratings</h3>
      {ratings.map((rating, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={rating}
            onChange={() => handleRatingChange(rating)}
          />
          {'★'.repeat(rating)}
        </div>
      ))}

      <hr />
      <br />
      <button onClick={() => {
        setSelectedCategories([]);
        setSelectedPrices([]);
        setSelectedRatings([]);
      }}>clear filter</button>

      <div >
        <h3>Filtered Products</h3>

        {filteredProducts.map(product => (
          <div key={product.id}>
                    <div style={{border:"1px solid lightgray" ,gap:"3px"}}>
            <h4>{product.title}</h4>
            <img src={product.image}  height={60} width={50}
            alt="" />
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {'★'.repeat(Math.round(product.rating.rate))}</p>
            </div>
          </div>
        )).slice(0,2)}
        </div>
   
    </div>
  );
};

export default LeftMenu;