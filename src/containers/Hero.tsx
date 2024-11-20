/* Key Features:
1. Main landing section with responsive design
2. Tailwind CSS styling with custom animations
3. Call-to-action buttons
4. Professional introduction content
*/
import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import AudioPlayer from '../components/AudioPlayer';

export default function Hero() {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/arnoldadero",
      label: "GitHub",
      color: "hover:text-[#2DA44E]"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/arnold-adero-49607955",
      label: "LinkedIn",
      color: "hover:text-[#0A66C2]"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:arnold@mvuvi.co.ke",
      label: "Email",
      color: "hover:text-[#EA4335]"
    }
  ];

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-hero-secondary/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute -bottom-8 right-0 w-96 h-96 bg-hero-primary/30 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-hero-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-10 animate-slide-up">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-white inline-block mb-2">Full-Stack</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-accent">Engineer</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Crafting robust, scalable solutions with Golang, JavaScript, and Rust. 
                  Passionate about performance, security, and exceptional user experiences.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-6 items-center">
                <AudioPlayer />
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-white hover:scale-110 transform ${link.color} hover:shadow-lg group`}
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-sm bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#projects" 
                  className="group relative px-8 py-4 text-white font-medium rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-hero-primary to-hero-secondary transition-all duration-300 group-hover:scale-110" />
                  <div className="relative flex items-center gap-3">
                    View Projects
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
                <a 
                  href="https://www.upwork.com/freelancers/arnoldadero"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="group px-8 py-4 text-white font-medium rounded-2xl bg-white/5 hover:bg-[#14A800]/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                >
                  <svg 
                    className="w-5 h-5 transform group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                  </svg>
                  Work History
                </a>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative group animate-scale max-w-md mx-auto">
              <div className="relative z-10 rounded-2xl overflow-hidden h-[500px]">
                <img 
                  src="https://i.postimg.cc/Zqkq4MW8/Arnold-Profile-dev.jpg"
                  alt="Developer workspace"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-hero-primary/20 via-hero-secondary/20 to-hero-accent/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-60 transition-all duration-700 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-white">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white">
        <Contact />
      </section>
    </>
  );
}