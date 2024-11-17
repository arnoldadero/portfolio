import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Loader2, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section id="contact" className="py-20 min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100/50 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-gray-600 text-lg">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                <a 
                  href="mailto:alex@example.com"
                  className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Mail className="w-5 h-5" />
                  Email Directly
                </a>
              </div>

              {submitted && (
                <div className="text-center mt-4 p-4 bg-green-50 text-green-600 rounded-lg animate-fade-in">
                  Thanks for your message! I'll get back to you soon.
                </div>
              )}
            </form>

            <div className="mt-12 pt-12 text-center">
              <a 
                href="#"
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-indigo-600 px-6 py-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <a 
        href="https://wa.me/+254728434471?text=Hello%20Mvuvi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3 pr-4 
          bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full 
          shadow-lg hover:shadow-2xl 
          transition-all duration-300 ease-in-out
          hover:-translate-y-1 hover:scale-105
          group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with Mvuvi on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 animate-bounce-slow" />
        <span className="max-w-0 overflow-hidden opacity-0 
          group-hover:max-w-xs group-hover:opacity-100
          transition-all duration-300 ease-in-out whitespace-nowrap">
          Message Mvuvi
        </span>
      </a>
    </>
  );
}