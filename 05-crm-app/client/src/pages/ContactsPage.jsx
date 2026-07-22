import { useState, useEffect } from "react";
import { getContacts } from "../api/contactsApi";

function ContactsPage() {
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
      <h1>Contacts Page</h1>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <strong>
            {contact.first_name} {contact.surname}
          </strong>
          <p>Email: {contact.email}</p>
          <p>Company: {contact.company_name}</p>
          <p>Industry: {contact.industry}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactsPage;
