import { useState } from "react";

export const FormsPlayground = () => {
  const [values, setValues] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    setConfirm(false);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!values.firstname.trim())
      tempErrors.firstname = "First name is required";

    if (!values.surname.trim()) tempErrors.surname = "Surname is required";

    const emailPattern = /\S+@\S+\.\S+/;
    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      tempErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  return (
    <div>
      {confirm === true && (
        <div style={{ color: "green", marginBottom: "20px" }}>
          <strong>
            Thanks for submitting successfully, here are your details:
          </strong>
          <p>Firstname: {values.firstname}</p>
          <p>Surname: {values.surname}</p>
          <p>Email: {values.email}</p>
          <p>Password: ********</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          onChange={handleChange}
          value={values.firstname}
          placeholder="Lucia"
        />
        {errors.firstname && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.firstname}</p>
        )}
        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          value={values.surname}
          placeholder="Caminos"
        />
        {errors.surname && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.surname}</p>
        )}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="luciacaminos@gtamail.com"
        />
        {errors.email && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.email}</p>
        )}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="**********"
        />
        {errors.password && (
          <p style={{ color: "red", margin: "4px 0" }}>{errors.password}</p>
        )}
        <button>Submit</button>
      </form>
    </div>
  );
};
