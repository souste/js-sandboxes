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
  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <strong>{product.title}</strong>
            <p>{[product.category]}</p>
            <p>{product.price}</p>
            <p>{product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
