import { useState } from "react";

export const FormsPlayground = () => {
  const [values, setValues] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirm(true);
  };

  return (
    <div>
      {confirm === true && (
        <div>
          <strong>
            Thanks for submitting successfully, here are your details:
          </strong>
          <p>Firstname: {values.firstname}</p>
          <p>Surname: {values.surname}</p>
          <p>Email: {values.email}</p>
          <p>Password: ********</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          onChange={handleChange}
          value={values.firstname}
          placeholder="Lucia"
        />
        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          value={values.surname}
          placeholder="Caminos"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="luciacaminos@gtamail.com"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="**********"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
