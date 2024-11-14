import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in">
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
          <div className="relative group max-w-md mx-auto md:max-w-none">
            <img 
              src="https://i.postimg.cc/ThMvFtJt/Arnold-Profile-dev.jpg"
              alt="Developer workspace"
              className="w-full h-[400px] md:h-[480px] object-cover rounded-2xl shadow-2xl 
                       transition-all duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-indigo-600/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}