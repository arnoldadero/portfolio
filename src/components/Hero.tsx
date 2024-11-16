/* Key Features:
1. Main landing section with responsive design
2. Tailwind CSS styling with custom animations
3. Call-to-action buttons
4. Professional introduction content
*/
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
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
              <a href="#projects" className="button-primary">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="button-secondary">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="relative group animate-float max-w-md mx-auto">
            <img 
              src="https://i.postimg.cc/Zqkq4MW8/Arnold-Profile-dev.jpg"
              alt="Developer workspace"
              className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] w-full"
              loading="lazy"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}