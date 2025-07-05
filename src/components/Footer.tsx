import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { BackToTop } from '@/pages/BacktoTop';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Tech Innovation', path: '/category/tech-innovation' },
    { name: 'AI & Machine Learning', path: '/category/ai-machine-learning' },
    { name: 'Web Development', path: '/category/web-development' },
    { name: 'Company Culture', path: '/category/company-culture' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Disclaimer', path: '/disclaimer' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-200 to-blue-400 text-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-black-400 lg:text-center">
          {/* Company Info */}
          <div className="lg:col-span-1 lg:text-left">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png" 
                alt="Vjtha Learning Logo" 
                className="w-18 h-16 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Vjtha Learning</h3>
                <p className="text-sm text-black-400">Digital Insights & Innovation</p>
              </div>
            </div>
            <p className="text-black-400 mb-6 leading-relaxed">
              Empowering businesses with cutting-edge technology insights, innovative solutions, 
              and expert analysis of digital transformation trends.
            </p>
            <div className="space-y-3 text-sm text-black-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-black-400" />
                <span>vjthalearning@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-black-400" />
                <span>+91 77807 21731</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-3 ">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-black-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          
        </div>

        <div className="border-t border-black-800 mt-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-center md:text-left">
            
            {/* Column 1 - Copyright */}
            <div>
              <p className="text-black-400 text-sm">
                © {currentYear} Vjtha Learning. All rights reserved.
              </p>
            </div>

            {/* Column 2 - Legal Links */}
            <div>
              <ul className="space-y-2 flex-col md:flex-row md:space-x-6 md:space-y-0 flex justify-center md:justify-start text-sm text-black-400">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-black-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Social Links */}
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://twitter.com/flyhinedia"
                className="bg-black-800 hover:bg-pink-600 hover:text-white p-2 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/flyhinedia"
                className="bg-black-800 hover:bg-blue-200 hover:text-black p-2 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/flyhinedia"
                className="bg-black-800 hover:bg-blue-800 hover:text-white p-2 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
  </footer>
    
  );
};

export default Footer;
