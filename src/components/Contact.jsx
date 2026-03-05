'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import emailjs from "@emailjs/browser";
import { usePortfolio } from '../contexts/PortfolioContext';

// --- COMPONENT: THE TERMINAL FORM ---
const CodeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [lineCount, setLineCount] = useState(12);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      await emailjs.send(
        "service_95ulhwq",
        "template_1s2w0yi",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          subject: "Portfolio Contact"
        },
        "nhKT0pj_XHjn32KlL"
      );
      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    const lines = formData.message.split('\n').length;
    setLineCount(Math.max(12, 10 + lines));
  }, [formData.message]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl border border-white/10 font-medium text-sm relative group">
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="ml-4 px-3 py-1 bg-[#1E1E1E] rounded-t-md text-neutral-400 text-xs flex items-center gap-2 border-t border-blue-500">
            <span className="text-blue-400">TS</span> contact.tsx
          </div>
        </div>
        <div className="text-xs text-neutral-500">BASH</div>
      </div>

      <div className="p-0 relative flex">
        <div className="w-12 bg-[#1E1E1E] border-r border-[#333] flex flex-col items-end pr-3 pt-4 text-neutral-600 select-none">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-6 text-xs">{i + 1}</div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 p-4 overflow-x-hidden text-neutral-300">
          <div className="mb-2">
            <span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ send }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'emailjs-com'</span>;
          </div>
          <div className="mb-4">
            <span className="text-blue-400">const</span> <span className="text-yellow-300">sendMessage</span> <span className="text-white">=</span> <span className="text-blue-400">async</span> () <span className="text-blue-400">=&gt;</span> <span className="text-yellow-300">{`{`}</span>
          </div>

          <div className="pl-4 space-y-1">
            <div className="flex items-center group/line focus-within:bg-white/5 -ml-4 pl-4">
              <span className="text-blue-400">const</span>&nbsp;
              <span className="text-red-400">sender</span>&nbsp;=&nbsp;
              <span className="text-green-400">"</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name"
                className="bg-transparent border-none outline-none text-green-400 placeholder-neutral-600 min-w-[100px] flex-1 font-medium py-0 h-6 focus:ring-0" autoComplete="off" />
              <span className="text-green-400">"</span>;
            </div>

            <div className="flex items-center group/line focus-within:bg-white/5 -ml-4 pl-4">
              <span className="text-blue-400">const</span>&nbsp;
              <span className="text-red-400">email</span>&nbsp;&nbsp;=&nbsp;
              <span className="text-green-400">"</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com"
                className="bg-transparent border-none outline-none text-green-400 placeholder-neutral-600 min-w-[100px] flex-1 font-medium py-0 h-6 focus:ring-0" autoComplete="off" />
              <span className="text-green-400">"</span>;
            </div>

            <div className="group/line focus-within:bg-white/5 -ml-4 pl-4 pt-1">
              <div className="flex">
                <span className="text-blue-400">await</span>&nbsp;
                <span className="text-yellow-300">send</span>(
                <span className="text-green-400">`</span>
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..."
                className="w-full bg-transparent border-none outline-none text-green-400 placeholder-neutral-600 resize-none font-medium py-0 pl-8 min-h-[80px] focus:ring-0 leading-6" spellCheck="false" />
              <div className="text-green-400">`</div>);
            </div>
          </div>

          <div className="mt-4 text-yellow-300">{`}`}</div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <button type="submit" disabled={status === 'sending' || status === 'success'}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all duration-300
                ${status === 'idle' ? 'bg-accent text-black hover:bg-accent/80' : ''}
                ${status === 'sending' ? 'bg-yellow-500/20 text-yellow-500 cursor-wait' : ''}
                ${status === 'success' ? 'bg-green-500/20 text-green-500' : ''}
                ${status === 'error' ? 'bg-red-500/20 text-red-500' : ''}`}
            >
              {status === 'idle' && (<><span className="text-lg">▶</span> EXECUTE_CODE()</>)}
              {status === 'sending' && "COMPILING_AND_SENDING..."}
              {status === 'success' && (<><span>✔</span> 200 OK: MESSAGE_SENT</>)}
              {status === 'error' && "ERROR: RETRY_FAILED"}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl -z-10 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
  );
};


// --- MAIN CONTACT SECTION ---
const Contact = () => {
  const { socialLinks } = usePortfolio();

  return (
    <section id="contact" className="py-32 bg-background relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ffffff 25%, #ffffff 26%, transparent 27%, transparent 74%, #ffffff 75%, #ffffff 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-accent font-medium text-sm tracking-wider uppercase">Encrypted Channel</span>
          <h2 className="font-sans text-4xl md:text-5xl font-bold mt-2 text-white mb-6">
            Initialize <br />
            <span className="text-neutral-500">Handshake.</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-md">
            Got an ambitious project? I'm ready to deploy.
            Fill out the terminal parameters or establish a direct connection via social protocols.
          </p>

          <div className="space-y-6">
            {socialLinks?.email && (
              <a href={`mailto:${socialLinks.email}`} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold group-hover:text-accent transition-colors">Email Protocol</h4>
                  <p className="text-neutral-500 text-sm font-medium">{socialLinks.email}</p>
                </div>
              </a>
            )}

            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-300">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold group-hover:text-[#0077b5] transition-colors">LinkedIn Node</h4>
                  <p className="text-neutral-500 text-sm font-medium">Connect professionally</p>
                </div>
              </a>
            )}

            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <FaGithub size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold group-hover:text-neutral-300 transition-colors">GitHub Repository</h4>
                  <p className="text-neutral-500 text-sm font-medium">Review source codes</p>
                </div>
              </a>
            )}
          </div>
        </div>

        <div>
          <CodeForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;