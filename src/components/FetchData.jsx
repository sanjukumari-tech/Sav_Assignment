import { Suspense, lazy, useState, useEffect } from 'react';

const LeftMenu = lazy(() => import('./LeftMenu'));
const Products = lazy(() => import('./Products'));

const FetchData = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("getting error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearFilters = () => {
    console.log('Filters cleared');
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div style={{ height: "auto", width: "30%", padding: "10px" }}>
        <Suspense fallback={<div>Loading LeftMenu...</div>}>
          <LeftMenu products={products} onClearFilters={handleClearFilters} />
        </Suspense>
      </div>
      <div style={{ height: "100vh", width: "70%", padding: "10px" }}>
        <Suspense fallback={<div>Loading Products...</div>}>
          <Products products={products} />
        </Suspense>
      </div>
    </div>
  );
};

export default FetchData;
