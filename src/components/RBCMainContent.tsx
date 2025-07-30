'use client';

import { PageType } from './pages/PageRouter';

interface RBCMainContentProps {
  isMobile: boolean;
  onNavigate?: (page: PageType) => void;
}

export default function RBCMainContent({ isMobile, onNavigate }: RBCMainContentProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#005DAA] to-[#004080] text-white">
          <div className="p-6 pt-8">
            <h1 className="text-2xl font-bold mb-4">Welcome back, John</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-[#005DAA] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Transfer</span>
            </button>
            
            <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-[#005DAA] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Pay Bills</span>
            </button>
            
            <button 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center space-y-2"
              onClick={() => onNavigate?.('investing')}
              aria-label="View investments"
            >
              <div className="w-12 h-12 bg-[#005DAA] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Investments</span>
            </button>
            
            <button 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center space-y-2"
              onClick={() => onNavigate?.('credit-score')}
              aria-label="View credit score"
            >
              <div className="w-12 h-12 bg-[#005DAA] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Credit Score</span>
            </button>
          </div>

          {/* Accounts */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Accounts</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">Chequing Account</div>
                    <div className="text-sm text-gray-500">****2847</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$3,247.85</div>
                    <div className="text-sm text-green-600">Available</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">Savings Account</div>
                    <div className="text-sm text-gray-500">****9156</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$9,599.47</div>
                    <div className="text-sm text-green-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Metro Grocery</div>
                      <div className="text-sm text-gray-500">Today</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-medium">-$67.23</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Salary Deposit</div>
                      <div className="text-sm text-gray-500">Yesterday</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">+$2,850.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#005DAA] to-[#0066CC] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Welcome back, John
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Manage your finances with confidence. Your financial goals are within reach.
              </p>
            </div>
            <div className="lg:text-right">
              <div className="flex space-x-8 justify-end mt-24">
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="text-sm font-medium text-white">Send</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-sm font-medium text-white">Transfer</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Pay Bills</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium text-white">Deposit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accounts Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Accounts</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#005DAA] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">RBC Chequing Account</div>
                      <div className="text-sm text-gray-600">****2847</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-gray-900">$3,247.85</div>
                    <div className="text-sm text-green-600">Available Balance</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">RBC High Interest Savings</div>
                      <div className="text-sm text-gray-600">****9156</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-gray-900">$9,599.47</div>
                    <div className="text-sm text-green-600">Available Balance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Credit Score Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Credit Score</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">762</div>
                <div className="text-sm text-gray-600 mb-4">Excellent</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium text-sm">
                  View Full Report
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium text-sm">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Metro Grocery</div>
                      <div className="text-xs text-gray-500">Today</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-medium text-sm">-$67.23</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Salary Deposit</div>
                      <div className="text-xs text-gray-500">Yesterday</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-medium text-sm">+$2,850.00</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Hydro Payment</div>
                      <div className="text-xs text-gray-500">2 days ago</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-medium text-sm">-$124.67</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
