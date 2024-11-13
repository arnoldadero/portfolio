import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600">
              We're dedicated to bringing transparency and sustainability to the fishing industry 
              through innovative blockchain technology and smart supply chain solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Features</li>
              <li>Documentation</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2024 Fisheries Supply Chain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}