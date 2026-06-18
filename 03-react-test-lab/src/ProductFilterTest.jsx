import { useState } from "react";

const FRESH_PRODUCTS = [
  {
    id: 1,
    title: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 89.99,
    rating: 4.7,
  },
  {
    id: 2,
    title: "Yoga Mat & Block Set",
    category: "Fitness",
    price: 24.99,
    rating: 4.3,
  },
  {
    id: 3,
    title: "Adjustable Dumbbell Pair",
    category: "Fitness",
    price: 149.99,
    rating: 4.8,
  },
  {
    id: 4,
    title: "4K Ultra HD Monitor",
    category: "Electronics",
    price: 249.99,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Ergonomic Desk Lamp",
    category: "Furniture",
    price: 34.99,
    rating: 4.1,
  },
  {
    id: 6,
    title: "Memory Foam Seat Cushion",
    category: "Furniture",
    price: 24.99, // Same price as Yoga Mat to test tie-breaker sorting!
    rating: 4.5,
  },
  {
    id: 7,
    title: "Noise-Cancelling Earbuds",
    category: "Electronics",
    price: 129.99,
    rating: 4.4,
  },
  {
    id: 8,
    title: "Resistance Bands Pack",
    category: "Fitness",
    price: 14.99,
    rating: 4.2,
  },
];

export const ProductFilterTest = () => {
  const [products] = useState(FRESH_PRODUCTS);
  const [searchValue, setSearchValue] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");
  const [sortProduct, setSortProduct] = useState("none");

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .filter(
      (product) =>
        selectCategory === "All" || product.category === selectCategory,
    )
    .sort((a, b) => {
      if (sortProduct === "highestPrice") return b.price - a.price;
      if (sortProduct === "lowestPrice") return a.price - b.price;
      if (sortProduct === "ratings") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="product-container">
      <h1 className="title">Product Filter Test Repo</h1>
      <div className="controls-bar">
        <input
          type="text"
          name="product"
          placeholder="Search for any product"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fitness">Fitness</option>
          <option value="Furniture">Furniture</option>
        </select>
        <select onChange={(e) => setSortProduct(e.target.value)}>
          <option value="none">None</option>
          <option value="highestPrice">Price: Highest to Lowest</option>
          <option value="lowestPrice">Price: Lowest to Highest</option>
          <option value="ratings">Ratings: Highest to Lowest</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <strong>{product.title}</strong>
            <p>Category: {product.category}</p>
            <p>Price £{product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
