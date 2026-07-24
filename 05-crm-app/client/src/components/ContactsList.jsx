import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContacts } from "../api/contactsApi";
import ContactCard from "./ContactCard";
import SyncButton from "./SyncButton";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        console.log(contacts);
        setContacts(contacts);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const search = searchTerm.toLowerCase();

  const displayedContacts = contacts
    .filter((contact) => {
      return (
        contact.first_name.toLowerCase().includes(search) ||
        contact.surname.toLowerCase().includes(search) ||
        contact.company_name?.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      console.log(sortBy);
      if (sortBy === "name-a-z")
        return a.first_name.localeCompare(b.first_name);
      if (sortBy === "name-z-a")
        return b.first_name.localeCompare(a.first_name);
      if (sortBy === "company-asc")
        return (a.company_name || "").localeCompare(b.company_name || "");
      if (sortBy === "industry-asc")
        return (a.industry || "").localeCompare(b.industry || "");

      return 0;
    });

  if (loading) return <p>Loading Contacts</p>;

  return (
    <div>
      <div>
        <p>Total Contacts: {contacts.length}</p>
        <SyncButton setContacts={setContacts} />
      </div>
      <div>
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for any contact"
        />
      </div>
      <div>
        <label>Sort Cotacts</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Default</option>
          <option value="name-a-z">First Name A-Z</option>
          <option value="name-z-a">First Name Z-A</option>
          <option value="company-asc">Company A-Z</option>
          <option value="industry-asc">Industry A-Z</option>
        </select>
      </div>
      <div>
        {displayedContacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          displayedContacts.map((contact) => (
            <Link to={`/contacts/${contact.id}`} key={contact.id}>
              <ContactCard contact={contact} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactsList;
