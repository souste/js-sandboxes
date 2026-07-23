import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContacts } from "../api/contactsApi";
import ContactCard from "./ContactCard";
import SyncButton from "./SyncButton";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
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

  const displayedContacts = contacts.filter((contact) => {
    return (
      contact.first_name.toLowerCase().includes(search) ||
      contact.surname.toLowerCase().includes(search) ||
      contact.company_name?.toLowerCase().includes(search)
    );
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
