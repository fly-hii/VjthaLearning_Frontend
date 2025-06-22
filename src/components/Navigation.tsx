import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navItems = [
    { name: 'Trending', path: '/' },
    {
      name: 'Jobs',
      path: '/jobs',
      dropdown: [
        { name: 'Today Posted', path: '/jobs/today' },
        { name: 'Tech Jobs', path: '/jobs/tech' },
        { name: 'Non-tech jobs', path: '/jobs/non-tech' },
        { name: 'Internships', path: '/jobs/internships' },
        { name: 'Urgent Requirements', path: '/jobs/urgent' },
      ]
    },
    { name: 'Articles', path: '/articles' },
    {
      name: 'Explore More',
      path: '/categories',
      dropdown: [
        { name: 'Tech Innovation', path: '/category/tech-innovation' },
        { name: 'AI & Machine Learning', path: '/category/ai-machine-learning' },
        { name: 'Web Development', path: '/category/web-development' },
        { name: 'Company Culture', path: '/category/company-culture' },
        { name: 'Industry Trends', path: '/category/industry-trends' },
        { name: 'Case Studies', path: '/category/case-studies' },
      ]
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <nav className="bg-gradient-to-r from-blue-200 via-purple-300 to-pink-300 bg-[length:300%_300%] animate-gradient-x text-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between py-2">
          <p className="text-xs font-medium">{today}</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 text-black hover:text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-black hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-black hover:text-blue-400" />
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png" 
              alt="Vjtha Media Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Vjtha Media</h1>
              <p className="text-xs text-gray-500">Digital Insights & Innovation</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.path}
                            className="block px-2 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-2 border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`block py-2 px-2 font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 border-l-2 border-gray-200">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.path}
                        className="block py-2 pl-4 text-xs text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
