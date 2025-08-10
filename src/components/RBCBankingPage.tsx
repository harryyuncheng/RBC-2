import React from 'react';

import Image from 'next/image';
import { FiFile, FiMail, FiGift, FiPrinter } from 'react-icons/fi';
import { MdOutlineRocketLaunch } from 'react-icons/md';

interface RBCBankingPageProps {
  isMobile: boolean;
  onNavigate?: (page: string) => void;
}

const RBCBankingPage: React.FC<RBCBankingPageProps> = ({ isMobile, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        {/* Primary Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="flex justify-between items-center py-4">
              {/* RBC Logo */}
              <div className="flex items-center">
                <Image 
                  src="/rbc-logo.png" 
                  alt="RBC Logo" 
                  width={152} 
                  height={56}
                  className="h-14 w-auto"
                />
              </div>

              {/* User Info and Sign Out */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">JOHN DOE</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <button className="bg-[#FFD200] text-black px-4 py-2 text-sm font-medium flex items-center space-x-2 hover:bg-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-[#005DAA]">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="flex justify-between items-center py-2">
              <nav className="flex space-x-8">
                <a href="#" className="text-white hover:text-yellow-300 text-sm font-medium">Products & Services</a>
                <a href="#" className="text-white hover:text-yellow-300 text-sm font-medium">My Accounts</a>
                <a href="#" className="text-white hover:text-yellow-300 text-sm font-medium">Help Centre</a>
              </nav>
              <span className="text-white text-sm">August 9, 2025</span>
            </div>
          </div>
        </div>

        {/* Tertiary Navigation */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="flex items-center py-2">
              <nav className="flex space-x-8">
                <span className="text-gray-900 text-sm font-medium">Accounts Summary</span>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Profile & Account Settings</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative h-48 flex items-end">
        <Image 
          src="/banff.png" 
          alt="Banff landscape" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pb-4 w-full">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <h1 className="text-3xl font-light mb-2">Accounts Summary</h1>
              <h3 className="text-lg font-normal">Good Evening, <span className="font-medium">JOHN DOE</span></h3>
              <p className="text-sm mt-2">
                <a href="#" className="text-white hover:underline flex items-center">
                  Go to RBC US Banking
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </p>
            </div>
            
            {/* Ribbon Widget */}
            <div className="hidden md:flex items-center space-x-4 text-white text-xs">
              <a href="#" className="flex flex-col items-center hover:text-yellow-300">
                <FiFile className="w-5 h-5 mb-1" />
                <span>Statements</span>
              </a>
              <a href="#" className="flex flex-col items-center hover:text-yellow-300">
                <FiMail className="w-5 h-5 mb-1" />
                <span>Messages</span>
              </a>
              <a href="#" className="flex flex-col items-center hover:text-yellow-300">
                <FiGift className="w-5 h-5 mb-1" />
                <span>Offers</span>
              </a>
              <a href="#" className="flex flex-col items-center hover:text-yellow-300">
                <MdOutlineRocketLaunch className="w-5 h-5 mb-1" />
                <span>Beyond Banking</span>
              </a>
              <a href="#" className="flex flex-col items-center hover:text-yellow-300">
                <FiPrinter className="w-5 h-5 mb-1" />
                <span>Print</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Summary */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">My Accounts</h2>
              </div>
              
              {/* Chequing Account */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-medium text-gray-900">Chequing</h3>
                  <span className="text-sm text-gray-500">21212-1212121</span>
                </div>
                <div className="text-2xl font-light text-gray-900 mb-4">$21,212.12</div>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800">View Details</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Transfer Funds</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Pay Bills</a>
                </div>
              </div>

              {/* Savings Account */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-medium text-gray-900">Savings</h3>
                  <span className="text-sm text-gray-500">21212-1212122</span>
                </div>
                <div className="text-2xl font-light text-gray-900 mb-4">$5,432.89</div>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800">View Details</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Transfer Funds</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Payments & Transfers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Payments & Transfers</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Chequing 21212-1212121 = $21,212.12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Select ...</option>
                    <option>Dave McKay</option>
                    <option>Bill Gates</option>
                    <option>Joe Pork</option>
                    <option>Add a Payee</option>
                    <option>Other Royal Bank Customer</option>
                    <option>INTERAC e-Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">$</span>
                    <input type="text" placeholder="0.00" className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
                  Continue
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">7</span>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Account Alert</div>
                  <div className="text-gray-600">Your account balance is low</div>
                  <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Payment Reminder</div>
                  <div className="text-gray-600">Credit card payment due soon</div>
                  <div className="text-xs text-gray-500 mt-1">1 day ago</div>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All Messages</a>
              </div>
            </div>

            {/* Offers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Offers For You</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Special Rate Offer</h4>
                <p className="text-sm text-blue-800 mb-3">Get 3.5% interest on a new savings account</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn More</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">Open New Account</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">Apply for Credit Card</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">Book Appointment</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">Find Branch/ATM</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">Investment Services</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Banking</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Personal Banking</a></li>
                <li><a href="#" className="hover:text-gray-900">Business Banking</a></li>
                <li><a href="#" className="hover:text-gray-900">Online Banking</a></li>
                <li><a href="#" className="hover:text-gray-900">Mobile Banking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Borrowing</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Mortgages</a></li>
                <li><a href="#" className="hover:text-gray-900">Loans</a></li>
                <li><a href="#" className="hover:text-gray-900">Credit Cards</a></li>
                <li><a href="#" className="hover:text-gray-900">Lines of Credit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Investing</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Investment Advice</a></li>
                <li><a href="#" className="hover:text-gray-900">RRSPs</a></li>
                <li><a href="#" className="hover:text-gray-900">TFSAs</a></li>
                <li><a href="#" className="hover:text-gray-900">Mutual Funds</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Insurance</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Life Insurance</a></li>
                <li><a href="#" className="hover:text-gray-900">Home Insurance</a></li>
                <li><a href="#" className="hover:text-gray-900">Auto Insurance</a></li>
                <li><a href="#" className="hover:text-gray-900">Travel Insurance</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Button */}
      <button className="fixed right-0 top-1/2 transform -translate-y-1/2 rotate-90 bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 origin-bottom-right">
        Feedback
      </button>
    </div>
  );
};

export default RBCBankingPage;
