import { useState } from "react";

export const FormsPlaygroundTest = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
  });
  const [successPage, setSuccessPage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    setSuccessPage(false);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formValues.firstname.trim())
      tempErrors.firstname = "First name is required";

    if (!formValues.surname.trim()) tempErrors.surname = "Surname is required";

    const emailPattern = /\S+@\S+\.\S+/;
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(formValues.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formValues.password) {
      tempErrors.password = "A password is required";
    } else if (formValues.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSuccessPage(true);
    } else {
      setSuccessPage(false);
    }
  };

  return (
    <div>
      {successPage && (
        <div className="success-page-container">
          <p>Signup Successful. Here are your details:</p>
          <p>
            Name: {formValues.firstname} {formValues.surname}
          </p>
          <p>Email: {formValues.email}</p>
          <p>Password: ********</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="form-container">
        <label>Firstname:</label>
        {errors.firstname && <p className="errors">{errors.firstname}</p>}
        <input
          type="text"
          name="firstname"
          value={formValues.firstname}
          onChange={handleChange}
          placeholder="Jason"
        />
        <label>Surname:</label>
        {errors.surname && <p className="errors">{errors.surname}</p>}
        <input
          type="text"
          name="surname"
          value={formValues.surname}
          onChange={handleChange}
          placeholder="Duval"
        />
        <label>Email:</label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="jasonduval@gtamail.com"
        />
        <label>Password:</label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="********"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
