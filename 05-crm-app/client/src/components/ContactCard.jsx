function ContactCard({ contact }) {
  return (
    <div>
      <strong>
        {contact.first_name} {contact.surname}
      </strong>
      <p>Email: {contact.email}</p>
      <p>Company: {contact.company_name}</p>
      <p>Industry: {contact.industry}</p>
    </div>
  );
}

export default ContactCard;
