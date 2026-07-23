import "./App.css";
import { Routes, Route } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import ContactDetailsPage from "./pages/ContactDetailsPage";

function App() {
  return (
    <>
      <h1>Welcome to the CRM App</h1>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
