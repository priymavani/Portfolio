import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaComments, FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks } from '../data';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
      setStatus(" Please fill all fields.");
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
      setStatus(" Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus(" Failed to send message. Try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-background-light relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Contact Me" subtitle="Let's work together" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="text-neutral-300 mb-8">
              I'm interested in freelance opportunities – especially ambitious or large projects. 
              However, if you have other requests or questions, don't hesitate to use the form.
            </p>
            
            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-start gap-4"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href={`mailto:${socialLinks.email}`} className="text-neutral-400 hover:text-primary-400 transition-colors">
                    {socialLinks.email}
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-3 bg-secondary-500/10 rounded-lg text-secondary-400">
                  <FaComments size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Social Profiles</h4>
                  <div className="flex gap-4 items-center">
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                      <FaGithub size={18} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                      <FaLinkedin size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="p-6 glass rounded-xl"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-4">Let's discuss your project</h4>
              <p className="text-neutral-300 mb-4">
                Looking to start a new project or need help with an existing one?
                I'm open to discussing new opportunities and how we can work together.
              </p>
              <p className="text-neutral-400 text-sm">
                Current availability: <span className="text-success-400">Open for projects</span>
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-white placeholder-neutral-500 transition-all"
                  placeholder="John Doe"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-white placeholder-neutral-500 transition-all"
                  placeholder="john@example.com"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-white placeholder-neutral-500 transition-all"
                  placeholder="Project Inquiry"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-white placeholder-neutral-500 transition-all resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                ></textarea>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="pt-2"
              >
                <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
                <p className="status-message">{status}</p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Connect with Me</h3>
          <p className="text-neutral-300 mb-8">
            I'm active on social media and would love to connect with you.
          </p>
          
          <div className="space-y-6 mb-8">
            <motion.div 
              className="flex items-start gap-4"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                <FaLinkedin className="connect-icon" />
              </div>
              <div>
                <h4 className="font-medium mb-1">LinkedIn</h4>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {socialLinks.linkedin}
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-3 bg-secondary-500/10 rounded-lg text-secondary-400">
                <FaGithub className="connect-icon" />
              </div>
              <div>
                <h4 className="font-medium mb-1">GitHub</h4>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {socialLinks.github}
                </a>
              </div>
            </motion.div>
          </div> */}
        {/* </div> */}


      </div>
    </section>
  );
};

export default Contact;