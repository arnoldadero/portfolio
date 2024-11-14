import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';

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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Let's Build Something Amazing Together</h2>
          <p className="text-gray-600 mb-8">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Directly
              </a>
            </div>

            {submitted && (
              <div className="text-center mt-4 text-green-600">
                Thanks for your message! I'll get back to you soon.
              </div>
            )}
          </form>

          <div className="mt-12 pt-12 border-t">
            <a 
              href="#"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}