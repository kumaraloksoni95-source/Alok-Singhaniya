/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Menu, 
  X, 
  Search, 
  ChevronRight,
  Star,
  Globe,
  Wind
} from 'lucide-react';

// --- Types ---

interface Destination {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  price: string;
}

// --- Mock Data ---

const DESTINATIONS: Destination[] = [
  {
    id: '1',
    title: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000',
    description: 'A dramatic coastline where mountains meet the Mediterranean sea, dotted with pastel-colored villages.',
    rating: 4.9,
    price: '$1,200'
  },
  {
    id: '2',
    title: 'Kyoto Temples',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
    description: 'Ancient wooden temples, sublime Zen gardens, and colorful shrines reflecting centuries of history.',
    rating: 4.8,
    price: '$950'
  },
  {
    id: '3',
    title: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000',
    description: 'Whitewashed houses clinging to volcanic cliffs above the deep blue Aegean Sea.',
    rating: 5.0,
    price: '$1,500'
  },
  {
    id: '4',
    title: 'Swiss Alps',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&q=80&w=1000',
    description: 'Majestic snow-capped peaks and pristine alpine lakes offering breathtaking vistas.',
    rating: 4.7,
    price: '$1,800'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-ink/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-accent" />
          <span className="text-xl font-serif tracking-widest uppercase">Vantedge</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {['Destinations', 'Experiences', 'Journal', 'About'].map((item) => (
            <a key={item} href="#" className="micro-label hover:text-accent transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button className="hidden md:block px-6 py-2 border border-white/20 rounded-full micro-label hover:bg-white hover:text-ink transition-all">
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-ink border-b border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {['Destinations', 'Experiences', 'Journal', 'About'].map((item) => (
              <a key={item} href="#" className="text-2xl font-serif">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="micro-label mb-6 block">Curated Journeys</span>
          <h1 className="editorial-title mb-8">
            Beyond the <br />
            <span className="italic text-accent">Ordinary</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg opacity-70 font-light mb-12">
            Discover hidden gems and legendary landscapes through our meticulously crafted travel experiences.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-4 bg-white text-ink rounded-full micro-label hover:bg-accent hover:text-white transition-all flex items-center gap-3 group">
              Explore Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-12 py-4 border border-white/20 rounded-full micro-label hover:bg-white/10 transition-all">
              View Journal
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-12 hidden lg:block"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/30" />
          <span className="micro-label">Scroll to explore</span>
        </div>
      </motion.div>
    </section>
  );
};

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
    >
      <img 
        src={destination.image} 
        alt={destination.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="card-gradient opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex justify-between items-end">
          <div>
            <span className="micro-label text-accent mb-2 block">{destination.location}</span>
            <h3 className="text-3xl font-serif mb-2">{destination.title}</h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-sm font-light">Explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs">{destination.rating}</span>
            </div>
            <span className="text-sm font-light">{destination.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DestinationsGrid = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="micro-label text-accent mb-4 block">Our Collection</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            Destinations that <br />
            <span className="italic">Inspire Awe</span>
          </h2>
        </div>
        <button className="flex items-center gap-3 micro-label hover:text-accent transition-colors">
          View All Destinations <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DESTINATIONS.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-32 bg-white text-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1506929113670-b4319c668130?auto=format&fit=crop&q=80&w=1000" 
              alt="Experience" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 hidden md:block">
            <div className="bg-accent text-white p-12 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-serif mb-1">15+</span>
              <span className="micro-label text-[8px]">Years of Expertise</span>
            </div>
          </div>
        </div>

        <div>
          <span className="micro-label text-accent mb-6 block">The Vantedge Way</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Crafting <span className="italic">Unforgettable</span> Moments
          </h2>
          <p className="text-lg opacity-70 mb-12 font-light leading-relaxed">
            We believe travel is more than just visiting a place—it's about the stories you bring back. Our team of experts curates every detail to ensure your journey is seamless, authentic, and deeply personal.
          </p>
          
          <div className="space-y-8">
            {[
              { icon: Globe, title: 'Global Network', desc: 'Access to exclusive locations and private experiences worldwide.' },
              { icon: Compass, title: 'Expert Guidance', desc: 'Local specialists who know the secrets of every destination.' },
              { icon: Calendar, title: 'Seamless Planning', desc: 'From logistics to luxury, we handle everything for you.' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-1">{feature.title}</h4>
                  <p className="text-sm opacity-60 font-light">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <Wind className="w-6 h-6 text-accent" />
              <span className="text-xl font-serif tracking-widest uppercase">Vantedge</span>
            </div>
            <p className="opacity-50 font-light mb-8">
              Redefining luxury travel through curated experiences and editorial storytelling.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-ink transition-all">
                  <span className="sr-only">{social}</span>
                  <Globe className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="micro-label mb-8">Explore</h5>
            <ul className="space-y-4 font-light opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Experiences</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Private Jet</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Yacht Charter</a></li>
            </ul>
          </div>

          <div>
            <h5 className="micro-label mb-8">Company</h5>
            <ul className="space-y-4 font-light opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="micro-label mb-8">Newsletter</h5>
            <p className="opacity-50 font-light mb-6">Join our inner circle for exclusive travel insights.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <span className="text-xs opacity-40">© 2026 Vantedge Travel. All rights reserved.</span>
          <div className="flex gap-8 text-xs opacity-40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <DestinationsGrid />
        <ExperienceSection />
        
        {/* Call to Action Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-accent rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Globe className="w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 rotate-12" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-5xl md:text-7xl font-serif mb-8 text-white">
                Ready for your <br />
                <span className="italic">next chapter?</span>
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-light">
                Let us help you plan your next extraordinary journey. Our consultants are ready to craft your perfect escape.
              </p>
              <button className="px-12 py-4 bg-white text-accent rounded-full micro-label hover:scale-105 transition-all shadow-xl">
                Start Planning
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
