import React, { useState } from 'react';
import './Contactus.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createMailToLink = () => {
    const { name, email, subject, message } = formData;
    const toEmail = "admin@cinescore.com"; // 👈 Replace with your actual email
    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    return `mailto:${toEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = createMailToLink();
  };

  return (
    <div className="container-major">
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
      <h1 className="contact-title">Contact <span className="highlight">CineScore Team</span></h1>
      <p className="contact-subtitle">Have a question, feedback, or suggestion? Send us a message!</p>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="submit-btn">Send via Email</button>
      </form>
    </div>
    </div>
  );
}

export default ContactUs;
