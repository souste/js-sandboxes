import { useState } from "react";

const INITIAL_CART = [
  {
    id: "cart-item-1",
    name: "Dual-Mode Wireless Controller",
    category: "Gaming Gears",
    price: 54.99,
    quantity: 1,
    stockLimit: 4,
    image: "🎮",
  },
  {
    id: "cart-item-2",
    name: "Premium Mechanical Keyboard Switch Set",
    category: "PC Components",
    price: 29.5,
    quantity: 2,
    stockLimit: 5,
    image: "⚙️",
  },
  {
    id: "cart-item-3",
    name: "Aluminium Laptop Cooling Stand",
    category: "Office Comfort",
    price: 39.99,
    quantity: 1,
    stockLimit: 3,
    image: "💻",
  },
  {
    id: "cart-item-4",
    name: "Braided Nylon USB-C Cable (2m)",
    category: "Accessories",
    price: 12.45,
    quantity: 3,
    stockLimit: 10,
    image: "🔌",
  },
];

export function ShoppingCartTest() {
  const [items, setItems] = useState(INITIAL_CART);
  return (
    <div>
      <div>
        {items.map((item) => (
          <div>
            <strong>{item.name}</strong>
            <p>Category: {item.category}</p>
            <p>Price: £{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Stock Limit: {item.stockLimit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
