import { useState } from "react";

export const FormsPlaygroundTest = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formValues);

  return (
    <div>
      <form className="form-container">
        <label>Firstname:</label>
        <input
          type="text"
          name="firstname"
          value={formValues.firstname}
          onChange={handleChange}
          placeholder="Jason"
        />
        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          value={formValues.surname}
          onChange={handleChange}
          placeholder="Duval"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="jasonduval@gtamail.com"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="********"
        />
      </form>
    </div>
  );
};
