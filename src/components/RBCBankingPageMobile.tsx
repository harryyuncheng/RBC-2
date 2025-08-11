import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FiMenu, 
  FiX, 
  FiUser, 
  FiFile, 
  FiSettings,
  FiChevronRight,
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp
} from 'react-icons/fi';

const RBCBankingPageMobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('accounts');

  // Get current date in desired format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Menu Button */}
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>

          {/* RBC Logo */}
          <Image 
            src="/rbc-logo.png" 
            alt="RBC Logo" 
            width={80} 
            height={30}
            className="h-8 w-auto"
          />

          {/* Profile Button */}
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <FiUser className="w-6 h-6" />
          </button>
        </div>

        {/* Date Bar */}
        <div className="bg-[#005DAA] px-4 py-2">
          <p className="text-white text-sm text-center">{formattedDate}</p>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">JOHN DOE</p>
                  <p className="text-sm text-gray-500">Personal Banking</p>
                </div>
              </div>
            </div>
            
            <nav className="py-4">
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>My Accounts</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>Transfer & Pay</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>Deposit</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>Invest</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>Credit Cards</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                <span>Help & Support</span>
                <FiChevronRight className="w-5 h-5" />
              </a>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-[#FFD200] text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-[#005DAA] to-[#0066CC] px-4 py-6 text-white">
        <h1 className="text-xl font-light mb-1">Good Evening,</h1>
        <h2 className="text-2xl font-medium">JOHN DOE</h2>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6 bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <FiDollarSign className="w-6 h-6 text-[#005DAA] mb-2" />
            <span className="text-xs text-gray-700 text-center">Transfer</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <FiCreditCard className="w-6 h-6 text-[#005DAA] mb-2" />
            <span className="text-xs text-gray-700 text-center">Pay Bills</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <FiFile className="w-6 h-6 text-[#005DAA] mb-2" />
            <span className="text-xs text-gray-700 text-center">Deposit</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
            <FiTrendingUp className="w-6 h-6 text-[#005DAA] mb-2" />
            <span className="text-xs text-gray-700 text-center">Invest</span>
          </button>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('accounts')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'accounts' 
                ? 'border-[#005DAA] text-[#005DAA]' 
                : 'border-transparent text-gray-500'
            }`}
          >
            Accounts
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 relative ${
              activeTab === 'messages' 
                ? 'border-[#005DAA] text-[#005DAA]' 
                : 'border-transparent text-gray-500'
            }`}
          >
            Messages
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">7</span>
          </button>
          <button 
            onClick={() => setActiveTab('offers')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'offers' 
                ? 'border-[#005DAA] text-[#005DAA]' 
                : 'border-transparent text-gray-500'
            }`}
          >
            Offers
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'accounts' && (
          <div className="px-4 py-6 space-y-4">
            {/* Chequing Account */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Chequing</h3>
                    <p className="text-sm text-gray-500">21212-1212121</p>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-4">$21,212.12</div>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-[#005DAA] text-white py-2 px-4 rounded-lg text-sm font-medium">
                    Transfer
                  </button>
                  <button className="flex-1 border border-[#005DAA] text-[#005DAA] py-2 px-4 rounded-lg text-sm font-medium">
                    Pay Bills
                  </button>
                </div>
              </div>
            </div>

            {/* Savings Account */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Savings</h3>
                    <p className="text-sm text-gray-500">21212-1212122</p>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-4">$5,432.89</div>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-[#005DAA] text-white py-2 px-4 rounded-lg text-sm font-medium">
                    Transfer
                  </button>
                  <button className="flex-1 border border-[#005DAA] text-[#005DAA] py-2 px-4 rounded-lg text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Total Balance Card */}
            <div className="bg-gradient-to-r from-[#005DAA] to-[#0066CC] rounded-xl p-4 text-white">
              <p className="text-sm opacity-90 mb-1">Total Balance</p>
              <p className="text-2xl font-light">$26,645.01</p>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="px-4 py-6 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Account Alert</h4>
                  <p className="text-sm text-gray-600 mb-2">Your transfer was successfully deposited</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Payment Reminder</h4>
                  <p className="text-sm text-gray-600 mb-2">Credit card payment due soon</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Security Update</h4>
                  <p className="text-sm text-gray-600 mb-2">Your password was successfully updated</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="px-4 py-6 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <FiTrendingUp className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Special Rate Offer</h4>
                    <p className="text-sm text-gray-600">Get 3.5% interest on a new savings account</p>
                  </div>
                </div>
                <button className="w-full bg-[#005DAA] text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <FiCreditCard className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Cashback Credit Card</h4>
                    <p className="text-sm text-gray-600">Earn 2% cashback on all purchases</p>
                  </div>
                </div>
                <button className="w-full border border-[#005DAA] text-[#005DAA] py-2 px-4 rounded-lg text-sm font-medium">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2">
            <FiUser className="w-5 h-5 text-[#005DAA] mb-1" />
            <span className="text-xs text-[#005DAA]">Accounts</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <FiDollarSign className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Transfer</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <FiCreditCard className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Pay</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <FiTrendingUp className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Invest</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <FiSettings className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default RBCBankingPageMobile;
