'use client';

interface CreditCardsPageProps {
  isMobile: boolean;
}

export default function CreditCardsPage({ isMobile }: CreditCardsPageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Credit Cards Page">
        <div className="p-4">
          <div className="mb-6">
            <button 
              className="flex items-center text-[#005DAA] mb-4"
              aria-label="Go back to main page"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Credit Cards</h1>
            <p className="text-gray-600 mt-1">Manage your credit cards and rewards</p>
          </div>

          {/* My Credit Cards */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="My credit cards">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Credit Cards</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white" aria-label="RBC Rewards Visa card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-lg font-semibold">RBC Rewards Visa</div>
                    <div className="text-blue-100">****  ****  ****  2847</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$1,234.56</div>
                    <div className="text-blue-100 text-sm">Current Balance</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-blue-100">Credit Limit</div>
                    <div className="font-semibold">$5,000</div>
                  </div>
                  <div>
                    <div className="text-blue-100">Available</div>
                    <div className="font-semibold">$3,765.44</div>
                  </div>
                  <div>
                    <div className="text-blue-100">Due Date</div>
                    <div className="font-semibold">Aug 15</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white" aria-label="RBC Cash Back MasterCard">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-lg font-semibold">RBC Cash Back MasterCard</div>
                    <div className="text-red-100">****  ****  ****  9156</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$0.00</div>
                    <div className="text-red-100 text-sm">Current Balance</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-red-100">Credit Limit</div>
                    <div className="font-semibold">$3,000</div>
                  </div>
                  <div>
                    <div className="text-red-100">Available</div>
                    <div className="font-semibold">$3,000</div>
                  </div>
                  <div>
                    <div className="text-red-100">Due Date</div>
                    <div className="font-semibold">Aug 20</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rewards Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg" aria-label="Total rewards points">
                <div className="text-2xl font-bold text-gray-900">24,567</div>
                <div className="text-sm text-gray-600">RBC Rewards Points</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg" aria-label="Cash back earned">
                <div className="text-2xl font-bold text-gray-900">$156.78</div>
                <div className="text-sm text-gray-600">Cash Back Earned</div>
              </div>
            </div>
            <button className="w-full mt-4 text-[#005DAA] hover:text-[#004080] font-medium text-center py-2 border border-[#005DAA] rounded-lg" aria-label="Redeem rewards">
              Redeem Rewards
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Make payment">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Make Payment</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="View statements">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Statements</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Manage cards">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Manage</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Apply for new card">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Apply</div>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Transaction: Metro Grocery">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Metro Grocery</div>
                    <div className="text-sm text-gray-500">July 30, 2025 • Rewards Visa</div>
                  </div>
                </div>
                <div className="text-red-600 font-medium">-$67.23</div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Transaction: Gas Station">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Shell Gas Station</div>
                    <div className="text-sm text-gray-500">July 29, 2025 • Cash Back MasterCard</div>
                  </div>
                </div>
                <div className="text-red-600 font-medium">-$45.67</div>
              </div>
              
              <div className="flex justify-between items-center py-3" aria-label="Transaction: Payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Payment Received</div>
                    <div className="text-sm text-gray-500">July 25, 2025 • Auto Payment</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">+$500.00</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Credit Cards Page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            className="flex items-center text-[#005DAA] mb-6 hover:text-[#004080]"
            aria-label="Go back to main page"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Credit Cards</h1>
          <p className="text-gray-600 mt-2">Manage your credit cards, payments, and rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Credit Cards Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Credit cards overview">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Credit Cards</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="Apply for new card">
                  Apply for New Card
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white" aria-label="RBC Rewards Visa card details">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">RBC Rewards Visa</h3>
                      <p className="text-blue-100">****  ****  ****  2847</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">$1,234.56</div>
                      <div className="text-blue-100">Current Balance</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-blue-100">Credit Limit</div>
                      <div className="font-semibold text-lg">$5,000</div>
                    </div>
                    <div>
                      <div className="text-blue-100">Available</div>
                      <div className="font-semibold text-lg">$3,765.44</div>
                    </div>
                    <div>
                      <div className="text-blue-100">Minimum Payment</div>
                      <div className="font-semibold text-lg">$25.00</div>
                    </div>
                    <div>
                      <div className="text-blue-100">Due Date</div>
                      <div className="font-semibold text-lg">Aug 15, 2025</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white" aria-label="RBC Cash Back MasterCard details">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">RBC Cash Back MasterCard</h3>
                      <p className="text-red-100">****  ****  ****  9156</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">$0.00</div>
                      <div className="text-red-100">Current Balance</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-red-100">Credit Limit</div>
                      <div className="font-semibold text-lg">$3,000</div>
                    </div>
                    <div>
                      <div className="text-red-100">Available</div>
                      <div className="font-semibold text-lg">$3,000</div>
                    </div>
                    <div>
                      <div className="text-red-100">Minimum Payment</div>
                      <div className="font-semibold text-lg">$0.00</div>
                    </div>
                    <div>
                      <div className="text-red-100">Due Date</div>
                      <div className="font-semibold text-lg">Aug 20, 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="View all transactions">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Transaction: Metro Grocery">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Metro Grocery</div>
                      <div className="text-sm text-gray-500">July 30, 2025 • Rewards Visa ****2847</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-semibold">-$67.23</div>
                    <div className="text-sm text-gray-500">+67 points</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Transaction: Gas Station">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Shell Gas Station</div>
                      <div className="text-sm text-gray-500">July 29, 2025 • Cash Back MasterCard ****9156</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-semibold">-$45.67</div>
                    <div className="text-sm text-gray-500">+$0.91 cash back</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Transaction: Online Purchase">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Amazon Purchase</div>
                      <div className="text-sm text-gray-500">July 28, 2025 • Rewards Visa ****2847</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-semibold">-$124.99</div>
                    <div className="text-sm text-gray-500">+125 points</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Transaction: Payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Payment Received</div>
                      <div className="text-sm text-gray-500">July 25, 2025 • Auto Payment</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">+$500.00</div>
                    <div className="text-sm text-gray-500">Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rewards Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Rewards Summary</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg" aria-label="RBC Rewards points">
                  <div className="text-3xl font-bold text-gray-900">24,567</div>
                  <div className="text-sm text-gray-600">RBC Rewards Points</div>
                  <div className="text-xs text-gray-500 mt-1">≈ $245.67 value</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg" aria-label="Cash back earned">
                  <div className="text-3xl font-bold text-gray-900">$156.78</div>
                  <div className="text-sm text-gray-600">Cash Back Earned (YTD)</div>
                  <div className="text-xs text-gray-500 mt-1">Available to redeem</div>
                </div>
                
                <button className="w-full bg-[#005DAA] text-white py-3 rounded-lg hover:bg-[#004080] font-medium" aria-label="Redeem rewards">
                  Redeem Rewards
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Make payment">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Make Payment</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="View statements">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">View Statements</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Manage cards">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Manage Cards</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Report lost or stolen">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Report Lost/Stolen</span>
                </button>
              </div>
            </div>

            {/* Payment Due */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Due</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Rewards Visa</span>
                    <span className="text-orange-600 font-semibold">$25.00</span>
                  </div>
                  <div className="text-sm text-gray-600">Due: August 15, 2025</div>
                  <div className="text-xs text-orange-600 mt-1">15 days remaining</div>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Cash Back MasterCard</span>
                    <span className="text-green-600 font-semibold">$0.00</span>
                  </div>
                  <div className="text-sm text-gray-600">Due: August 20, 2025</div>
                  <div className="text-xs text-green-600 mt-1">No balance</div>
                </div>
              </div>
            </div>

            {/* Credit Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Credit Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Credit utilization tracker">
                  <div className="font-medium text-gray-900">Credit Utilization</div>
                  <div className="text-sm text-gray-500">Currently at 25% utilization</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Payment calculator">
                  <div className="font-medium text-gray-900">Payment Calculator</div>
                  <div className="text-sm text-gray-500">Plan your payments and interest</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Balance transfer calculator">
                  <div className="font-medium text-gray-900">Balance Transfer</div>
                  <div className="text-sm text-gray-500">Compare transfer options</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
