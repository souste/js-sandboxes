import "./App.css";
import { Routes, Route } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
    <>
      <h1>Welcome to the CRM App</h1>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
      </Routes>
    </>
  );
}

export default App;
