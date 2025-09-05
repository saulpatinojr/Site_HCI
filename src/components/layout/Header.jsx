import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const navLinks = [
  { name: 'Posts', path: '/foundational-posts' },
  { name: 'Videos', path: '/visualizing-complexity' },
  { name: 'Podcast', path: '/audio-architecture' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const activeLinkStyle = {
    color: 'var(--electric-teal)',
    textShadow: '0 0 8px var(--electric-teal)',
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-cyber-purple/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo />
            <span className="hch-title text-2xl hidden sm:block">Hybrid Cloud Insights</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-mono text-lg text-text-med hover:text-white transition-colors px-4 py-2 rounded-md"
              >
                {`// ${link.name}`}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-electric-teal hover:bg-cyber-purple/50">
              <Menu className="w-7 h-7" />
            </Button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-bg-med shadow-lg border-t border-cyber-purple"
        >
          <div className="flex flex-col items-center space-y-4 p-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="font-mono text-2xl text-text-light hover:text-electric-teal transition-colors py-2"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;