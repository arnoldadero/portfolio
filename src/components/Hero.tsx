import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Full-Stack Engineer
              <span className="block text-indigo-600">Building the Future</span>
            </h1>
            <p className="text-xl text-gray-600">
              Crafting robust, scalable solutions with Golang, JavaScript, and Rust. 
              Passionate about performance, security, and exceptional user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="button-primary">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="button-secondary">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://i.postimg.cc/ThMvFtJt/Arnold-Profile-dev.jpg"
              alt="Developer workspace"
              className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}