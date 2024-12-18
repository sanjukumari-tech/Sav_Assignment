import React, { useEffect, useState } from "react";
import "../style/Product.css"; // Import the CSS file


const Products = ({ products }) => {
  console.log('products',products)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSelectedProducts, setCurrentSelectedProducts] = useState(products);//for drag and drop selection of current product
  const [currentPage, setCurrentPage] = useState(1); // current state for page for pagination
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10; // Number of items to display per page

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Filter products based on search term
  const filteredProducts = currentSelectedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  const onDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index);
  };


  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    const updatedProducts = [...currentProducts];
    const [movedProduct] = updatedProducts.splice(draggedIndex, 1);
    updatedProducts.splice(index, 0, movedProduct); // Insert the dragged item at the new position
    setCurrentSelectedProducts(updatedProducts); // Update the product list after drag

    e.preventDefault();
  };


  console.log("currentProduct", currentSelectedProducts)

  const onDragOver = (e) => {
    e.preventDefault(); // allow dropping of product
  };

  useEffect(() => {
    // Simulate data loading delay
    setLoading(true);
    setTimeout(() => {
      setCurrentSelectedProducts(products);
      setLoading(false);
    }, 1000); // Adjust delay as needed
  }, [products]);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Input and Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
    
      {/* Scrollable Products Container */}
      <div className="products-scroll-container">
        <div className="products-container">
          {currentProducts.map((pro, index) => (
             <div
             key={pro.id}
             className="product-card"
             draggable
             onDragStart={(e) => onDragStart(e, index)}
             onDragOver={onDragOver}
             onDrop={(e) => onDrop(e, index)}
           >
             <h4>Title: {pro.title}</h4>
             <img src={pro.image} alt={pro.title} />
             <h4>Category: {pro.category}</h4>
             <h4>Description : {pro.description.slice(0, 100)}</h4>
             <h4>Price: ${pro.price}</h4>
             <div className="button-group">
               <button className="buy-now-button">Buy now</button>
               <button className="add-to-cart-button">Add to cart</button>
             </div>
           </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div  className="pagination" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button style={{border:"1px solid gray",BackgroundColor:"pink",gap:"3px",borderRadius:"5px",padding:"5px", margin:"0px 5px 5px 5px",cursor:"pointer"}}  onClick={goToPreviousPage}>
          Previous
        </button>

                {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
            <button  style={{border:"1px solid gray",BackgroundColor:"pink",gap:"3px",borderRadius:"5px",padding:"5px", margin:"0px 5px 5px 5px",cursor:"pointer"}} 
              key={index + 1}
               
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}

        <button  style={{border:"1px solid gray",BackgroundColor:"pink",gap:"3px",borderRadius:"5px",padding:"5px", margin:"0px 5px 5px 5px",cursor:"pointer"}}  onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

const memoizedProduct = React.memo(Products);

export default memoizedProduct;
