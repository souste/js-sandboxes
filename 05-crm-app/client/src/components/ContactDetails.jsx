import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContact } from "../api/contactsApi";

function ContactDetails() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setError("");
        const contact = await getContact(id);
        setContact(contact);
      } catch (err) {
        console.error("Failed to fetch contact", err);
        setError("Unable to load Contact");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  if (loading) return <p>Loading Contact</p>;

  if (error) return <p>{error}</p>;

  if (!contact) return <p>Contact not found</p>;

  return (
    <div>
      <h2>Contact Details:</h2>

      <p>
        <strong>Name:</strong> {contact.first_name} {contact.surname}
      </p>

      <p>
        <strong>Company: </strong>
        {contact.company_name}
      </p>
      <p>
        <strong>Industry: </strong>
        {contact.industry}
      </p>
      <p>
        <strong>Contact: </strong>
        {contact.email}
      </p>
    </div>
  );
}

export default ContactDetails;
