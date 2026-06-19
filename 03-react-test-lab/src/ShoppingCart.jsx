import { useState } from "react";

const INITIAL_CART = [
  {
    id: "cart-item-1",
    name: "Wireless Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    quantity: 1,
    stockLimit: 5,
    image: "⌨️",
  },
  {
    id: "cart-item-2",
    name: "Ergonomic Memory Foam Mousepad",
    category: "Office Supplies",
    price: 24.5,
    quantity: 2,
    stockLimit: 3,
    image: "🖱️",
  },
  {
    id: "cart-item-3",
    name: "USB-C Multi-Port Adapter Hub",
    category: "Electronics",
    price: 34.99,
    quantity: 1,
    stockLimit: 10,
    image: "🔌",
  },
  {
    id: "cart-item-4",
    name: "Stainless Steel Insulated Tumbler",
    category: "Kitchenware",
    price: 19.95,
    quantity: 3,
    stockLimit: 4,
    image: "🥤",
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState(INITIAL_CART);
  return (
    <div>
      <div>
        {items.map((item) => (
          <div>
            <strong>{item.name}</strong>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <p>{item.stockLimit}</p>
            <p>{item.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
