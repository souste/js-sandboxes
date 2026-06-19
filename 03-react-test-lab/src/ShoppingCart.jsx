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
  const [selectValue, setSelectValue] = useState("all");
  const [selectCategory, setSelectCategory] = useState("all");

  const filteredItems = items
    .filter((item) => selectValue === "all" || item.id === selectValue)
    .filter(
      (item) => selectCategory === "all" || item.category === selectCategory,
    );

  return (
    <div>
      <div>
        <p>Filter by Item:</p>
        <select onChange={(e) => setSelectValue(e.target.value)}>
          <option value="all">All</option>
          <option value="cart-item-1">Item 1: Keyboard</option>
          <option value="cart-item-2">Item 2: Mousepad</option>
          <option value="cart-item-3">Item 3: Adapter Hub</option>
          <option value="cart-item-4">Item 4: Insulated Tumbler</option>
        </select>
        <p>Filter by Category</p>
        <select onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Kitchenware">Kitchenware</option>
        </select>
      </div>

      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>
            <strong>{item.name}</strong>
            <p>Categroy: {item.category}</p>
            <p> Price: £{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Stock Limit: {item.stockLimit}</p>
            <p>{item.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
