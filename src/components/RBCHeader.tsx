'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RBCHeaderProps {
  isMobile: boolean;
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  onNavigate?: (page: string) => void;
}

export default function RBCHeader({ isMobile, onMenuToggle, isMobileMenuOpen, onNavigate }: RBCHeaderProps) {
  if (isMobile) {
    return (
      <header className="bg-[#005DAA] text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onMenuToggle}
              className="text-white"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button onClick={() => onNavigate?.('dashboard')} aria-label="Go to dashboard">
              <Image
                src="/rbc-logo.png"
                alt="RBC Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-[#004080] border-t border-blue-600">
            <nav className="py-4">
              <button 
                onClick={() => onNavigate?.('banking')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Banking"
              >
                Banking
              </button>
              <button 
                onClick={() => onNavigate?.('investing')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Investing"
              >
                Investing
              </button>
              <button 
                onClick={() => onNavigate?.('insurance')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Insurance"
              >
                Insurance
              </button>
              <button 
                onClick={() => onNavigate?.('credit-cards')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Credit Cards"
              >
                Credit Cards
              </button>
              <button 
                onClick={() => onNavigate?.('loans')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Loans"
              >
                Loans & Lines of Credit
              </button>
              <button 
                onClick={() => onNavigate?.('mortgages')} 
                className="block px-4 py-3 text-white hover:bg-blue-600 w-full text-left"
                aria-label="Navigate to Mortgages"
              >
                Mortgages
              </button>
            </nav>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#005DAA] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>Personal</span>
            <span>Business</span>
            <span>Corporate & Institutional</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>English</span>
            <span>|</span>
            <span>Français</span>
            <button className="flex items-center space-x-1 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Find a Location</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <button onClick={() => onNavigate?.('dashboard')} aria-label="Go to dashboard">
                <Image
                  src="/rbc-logo.png"
                  alt="RBC Logo"
                  width={120}
                  height={32}
                  className="h-10 w-auto"
                />
              </button>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('banking')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Banking"
                >
                  <span>Banking</span>
                </button>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('investing')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Investing"
                >
                  <span>Investing</span>
                </button>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('insurance')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Insurance"
                >
                  <span>Insurance</span>
                </button>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('credit-cards')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Credit Cards"
                >
                  <span>Credit Cards</span>
                </button>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('loans')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Loans"
                >
                  <span>Loans & Lines of Credit</span>
                </button>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => onNavigate?.('mortgages')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#005DAA] py-2"
                  aria-label="Navigate to Mortgages"
                >
                  <span>Mortgages</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-[#005DAA]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
            
            <button className="bg-[#FFD200] text-black px-6 py-2 rounded hover:bg-[#E6BD00] transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
