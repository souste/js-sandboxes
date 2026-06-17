import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 149.99,
    category: "Furniture",
    rating: 4.2,
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    category: "Fitness",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "Electronics",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Yoga Mat with Carrying Strap",
    price: 19.99,
    category: "Fitness",
    rating: 4.3,
  },
  {
    id: 6,
    title: "Smart Fitness Watch",
    price: 129.99,
    category: "Electronics",
    rating: 4.1,
  },
  {
    id: 7,
    title: "Adjustable Dumbbell Set",
    price: 199.99,
    category: "Fitness",
    rating: 4.7,
  },
  {
    id: 8,
    title: "Standing Desk Converter",
    price: 110.0,
    category: "Furniture",
    rating: 4.4,
  },
];

export const ProductFilter = () => {
  const [products] = useState(initialProducts);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("none");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const displayedProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory,
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
    });

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <form>
        <input type="text" name="search" onChange={handleChange} />
      </form>
      <select onChange={handleSelect}>
        <option value={"All"}>All</option>
        <option value={"Electronics"}>Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Fitness">Fitness</option>
      </select>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="none">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
      <div>
        {displayedProducts.map((product) => (
          <div key={product.id}>
            <strong>{product.title}</strong>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
