"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Instagram, Linkedin, ArrowRight, Play, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
  const [theme, setTheme] = useState('dark');

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setTheme(event.detail);
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const navigationLinks = {
    Content: [
      { name: "Movies", href: "/movies" },
      { name: "Series", href: "/Series" },
      { name: "Originals", href: "/originals" },
      { name: "Trending", href: "#" }
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Investor Relations", href: "#" }
    ],
    Support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Device Support", href: "#" },
      { name: "Accessibility", href: "#" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Content Guidelines", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  // const getFooterClasses = () => {
  //   if (theme === 'dark') {
  //     return 'bg-gradient-to-b from-black/95 via-gray-900/95 to-black border-t border-red-500/20';
  //   }
  //   return 'bg-gradient-to-b from-white/95 via-gray-50/95 to-white border-t border-purple-500/20';
  // };

  const getTextColor = (variant = 'primary') => {
    if (theme === 'dark') {
      switch (variant) {
        case 'primary': return 'text-white';
        case 'secondary': return 'text-gray-300';
        case 'muted': return 'text-gray-400';
        default: return 'text-white';
      }
    } else {
      switch (variant) {
        case 'primary': return 'text-black';
        case 'secondary': return 'text-gray-700';
        case 'muted': return 'text-gray-600';
        default: return 'text-black';
      }
    }
  };

  return (
    <footer className={`relative`}>
      
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand and Newsletter Section */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className={`text-2xl font-bold ${getTextColor('primary')} tracking-tight`}>
                VERTICA
              </span>
            </div>
            
            {/* Tagline */}
            <p className={`text-lg ${getTextColor('secondary')} leading-relaxed`}>
              Stream Beyond Reality. Experience premium entertainment with cutting-edge technology.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <div>
                <h3 className={`text-sm font-semibold ${getTextColor('primary')} mb-2 uppercase tracking-wide`}>
                  Stay Connected
                </h3>
                <p className={`text-sm ${getTextColor('muted')}`}>
                  Get exclusive updates, new releases, and behind-the-scenes content.
                </p>
              </div>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className={`flex-1 ${theme === 'dark' 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-red-500/50' 
                    : 'bg-black/5 border-black/20 text-black placeholder-gray-500 focus:border-purple-500/50'
                  } transition-colors`}
                />
                <Button 
                  size="icon" 
                  className="shrink-0 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(navigationLinks).map(([category, links]) => (
                <div key={category} className="space-y-4">
                  <h3 className={`text-sm font-semibold ${getTextColor('primary')} uppercase tracking-wide`}>
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className={`text-sm ${getTextColor('muted')} hover:${getTextColor('primary')} transition-all duration-200 relative group block`}
                        >
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        {/* <motion.div 
          className="mt-16 pt-8 border-t border-opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <Monitor className={`w-8 h-8 ${getTextColor('primary')} mx-auto`} />
              <h4 className={`text-sm font-semibold ${getTextColor('primary')}`}>4K Ultra HD</h4>
              <p className={`text-xs ${getTextColor('muted')}`}>Crystal clear streaming quality</p>
            </div>
            <div className="text-center space-y-2">
              <Play className={`w-8 h-8 ${getTextColor('primary')} mx-auto fill-current`} />
              <h4 className={`text-sm font-semibold ${getTextColor('primary')}`}>Original Content</h4>
              <p className={`text-xs ${getTextColor('muted')}`}>Exclusive VERTICA productions</p>
            </div>
            <div className="text-center space-y-2">
              <Github className={`w-8 h-8 ${getTextColor('primary')} mx-auto`} />
              <h4 className={`text-sm font-semibold ${getTextColor('primary')}`}>Multi-Device</h4>
              <p className={`text-xs ${getTextColor('muted')}`}>Stream anywhere, anytime</p>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Divider */}
      <div className={`h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-red-500/30 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'}`} />

      {/* Bottom Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className={`text-sm ${getTextColor('muted')}`}>
            © 2024 VERTICA. All rights reserved. • Made by Mudit
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl ${theme === 'dark' 
                    ? 'bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/40' 
                    : 'bg-black/5 border border-black/20 text-gray-600 hover:text-black hover:bg-purple-500/20 hover:border-purple-500/40'
                  } flex items-center justify-center transition-all duration-200 group`}
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;