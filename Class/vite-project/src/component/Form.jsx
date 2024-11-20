import React, { useState, useEffect } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsDisabled(true);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isDisabled) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const errors = {};


    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
    }

  
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

 
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be exactly 10 digits";
    }

  
    if (!formData.message) {
      errors.message = "Message is required";
    } else if (formData.message.length < 20) {
      errors.message = "Message must be at least 20 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      alert("Form submitted successfully!");
      setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Contact Form</h1>
      <p>Time left: {timeLeft} seconds</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isDisabled}
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isDisabled}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isDisabled}
            className={errors.phoneNumber ? "error" : ""}
          />
          {errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isDisabled}
            className={errors.message ? "error" : ""}
          />
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
