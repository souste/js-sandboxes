import { useState, useEffect } from "react";
import { getContacts } from "../api/contactsApi";
import ContactCard from "./ContactCard";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading Contacts</p>;

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <ContactCard contact={contact} />
        </div>
      ))}
    </div>
  );
}

export default ContactsList;
