/* Key Features:
1. Main landing section with responsive design
2. Tailwind CSS styling with custom animations
3. Call-to-action buttons
4. Professional introduction content
*/
import React from 'react';
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 overflow-hidden">
      {/* Add animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-8 right-0 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Full-Stack Engineer
              <span className="block gradient-text">Building the Future</span>
            </h1>
            <p className="text-xl text-gray-300">
              Crafting robust, scalable solutions with Golang, JavaScript, and Rust. 
              Passionate about performance, security, and exceptional user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="button-primary group">
                View Projects
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="button-secondary backdrop-blur-sm hover:bg-white/10">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="relative group animate-float max-w-md mx-auto">
            <img 
              src="https://i.postimg.cc/Zqkq4MW8/Arnold-Profile-dev.jpg"
              alt="Developer workspace"
              className="rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] w-full hover:shadow-indigo-500/25"
              loading="lazy"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-40 transition-all duration-500 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}