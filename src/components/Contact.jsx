import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("❌ Please fill all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const form = e.target;
      await emailjs.sendForm(
        "service_95ulhwq",    // Replace with your EmailJS Service ID
        "template_1s2w0yi",   // Replace with your EmailJS Template ID
        form,
        "nhKT0pj_XHjn32KlL"     // Replace with your EmailJS Public Key
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("❌ Failed to send message. Try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2> Contact Me</h2>
      <p className="text">Feel free to reach out for collaboration or any queries.</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={isLoading} />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required disabled={isLoading} />
        <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange} required disabled={isLoading}></textarea>
        <button type="submit" className={`contact-btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <p className="status-message">{status}</p>

      <div className="social-links">
        <h3>Address</h3>
        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.564524601101!2d72.47077331548754!3d22.81698417934685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e92d7452e8655%3A0x8b3fd7e0e7f3d3bb!2sRai%20University!5e0!3m2!1sen!2sin!4v1645100000000!5m2!1sen!2sin" allowFullScreen loading="lazy"></iframe>
        </div>
        
        <h3>Email:</h3>
        <p><a href="mailto:priymavani02@gmail.com">priymavani02@gmail.com</a></p>
      </div>

      <div className="connect-section">
        <h3>Connect with Me</h3>
        <div className="connect-cards">
          <a href="https://www.linkedin.com/in/priy-mavani/" target="_blank" rel="noopener noreferrer" className="connect-card">
            <FaLinkedin className="connect-icon" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/priymavani" target="_blank" rel="noopener noreferrer" className="connect-card">
            <FaGithub className="connect-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
