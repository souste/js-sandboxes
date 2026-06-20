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
  const [itemSelectValue, setItemSelectValue] = useState("all");
  const [categorySelectValue, setCategorySelectValue] = useState("all");

  const filteredItems = items
    .filter((item) => itemSelectValue === "all" || item.id === itemSelectValue)
    .filter(
      (item) =>
        categorySelectValue === "all" || item.category === categorySelectValue,
    );

  return (
    <div>
      <div>
        <p>Filter items: </p>
        <select onChange={(e) => setItemSelectValue(e.target.value)}>
          <option value="all">All</option>
          <option value="cart-item-1">Wireless Controller</option>
          <option value="cart-item-2">Keyboard Switch Set</option>
          <option value="cart-item-3">Laptop Cooling Stand</option>
          <option value="cart-item-4">Nylon USB-C Cable</option>
        </select>
        <p>Filter Categories</p>
        <select onChange={(e) => setCategorySelectValue(e.target.value)}>
          <option value="all">All</option>
          <option value="Gaming Gears">Gaming Gears</option>
          <option value="PC Components">PC Components</option>
          <option value="Office Comfort">Office Comfort</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>
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
