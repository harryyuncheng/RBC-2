'use client';

interface MortgagesPageProps {
  isMobile: boolean;
}

export default function MortgagesPage({ isMobile }: MortgagesPageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Mortgages Page">
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
            <h1 className="text-2xl font-bold text-gray-900">Mortgages</h1>
            <p className="text-gray-600 mt-1">Your home financing solutions</p>
          </div>

          {/* My Mortgage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="My mortgage">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Mortgage</h2>
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-gray-900">RBC Fixed Rate Mortgage</div>
                  <div className="text-sm text-gray-500">123 Main Street, Toronto</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">$342,567</div>
                  <div className="text-sm text-gray-500">Remaining Balance</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Interest Rate</div>
                  <div className="font-medium">4.79%</div>
                </div>
                <div>
                  <div className="text-gray-500">Monthly Payment</div>
                  <div className="font-medium">$2,156.78</div>
                </div>
                <div>
                  <div className="text-gray-500">Term Remaining</div>
                  <div className="font-medium">3 years, 4 months</div>
                </div>
                <div>
                  <div className="text-gray-500">Amortization</div>
                  <div className="font-medium">22 years left</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mortgage Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mortgage Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Next Payment</div>
                  <div className="text-sm text-gray-500">August 1, 2025</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">$2,156.78</div>
                  <div className="text-sm text-blue-600">Due in 2 days</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">$157,433</div>
                  <div className="text-sm text-gray-600">Principal Paid</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">$89,234</div>
                  <div className="text-sm text-gray-600">Interest Paid</div>
                </div>
              </div>
            </div>
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
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Renewal options">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Renewal</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="View statements">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Statements</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Mortgage calculator">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Calculator</div>
              </button>
            </div>
          </div>

          {/* Renewal Notice */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <div className="font-medium text-gray-900">Renewal Coming Up</div>
                <div className="text-sm text-gray-600 mt-1">Your mortgage term expires on December 15, 2027. Start exploring renewal options now.</div>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium text-sm mt-2">
                  Explore Options
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Mortgage payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Mortgage Payment</div>
                    <div className="text-sm text-gray-500">July 1, 2025</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">$2,156.78</div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Property tax payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Property Tax Payment</div>
                    <div className="text-sm text-gray-500">June 30, 2025</div>
                  </div>
                </div>
                <div className="text-blue-600 font-medium">$845.67</div>
              </div>
              
              <div className="flex justify-between items-center py-3" aria-label="Activity: Insurance payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Home Insurance Payment</div>
                    <div className="text-sm text-gray-500">June 25, 2025</div>
                  </div>
                </div>
                <div className="text-yellow-600 font-medium">$156.89</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Mortgages Page">
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
          <h1 className="text-3xl font-bold text-gray-900">Mortgages</h1>
          <p className="text-gray-600 mt-2">Your home financing and mortgage management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mortgage Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Mortgage overview">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Mortgage</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="View renewal options">
                  Renewal Options
                </button>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-gray-200" aria-label="Mortgage details">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">RBC Fixed Rate Mortgage</h3>
                      <p className="text-gray-600">123 Main Street, Toronto ON M5V 3A1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">$342,567</div>
                    <div className="text-sm text-gray-500">Remaining Balance</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div>
                    <div className="text-gray-500 text-sm">Interest Rate</div>
                    <div className="font-semibold text-lg">4.79%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Monthly Payment</div>
                    <div className="font-semibold text-lg">$2,156.78</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Term Remaining</div>
                    <div className="font-semibold text-lg">3 yrs, 4 mos</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Amortization Left</div>
                    <div className="font-semibold text-lg">22 years</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">Mortgage Progress</span>
                    <span className="font-medium">31.5% paid</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '31.5%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$157,433 paid</span>
                    <span>$342,567 remaining</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Breakdown</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg" aria-label="Next payment details">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Next Payment</span>
                      <span className="text-blue-600 font-semibold">Due in 2 days</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">$2,156.78</div>
                    <div className="text-sm text-gray-600">August 1, 2025</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Principal</span>
                      <span className="font-medium">$876.23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Interest</span>
                      <span className="font-medium">$1,280.55</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-semibold text-gray-900">Total Payment</span>
                      <span className="font-semibold text-gray-900">$2,156.78</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">$157,433</div>
                    <div className="text-sm text-gray-600">Total Principal Paid</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">$89,234</div>
                    <div className="text-sm text-gray-600">Total Interest Paid</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Renewal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Renewal Information</h2>
              
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Renewal Coming Up</h3>
                    <p className="text-gray-600 mb-4">Your current mortgage term expires on December 15, 2027. Start exploring your renewal options now to secure the best rates.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Current Term Expires</div>
                        <div className="font-medium">December 15, 2027</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Time Remaining</div>
                        <div className="font-medium">3 years, 4 months</div>
                      </div>
                    </div>
                    <button className="mt-4 bg-[#005DAA] text-white px-6 py-2 rounded-lg hover:bg-[#004080] font-medium">
                      Explore Renewal Options
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="View all activity">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Mortgage payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Mortgage Payment</div>
                      <div className="text-sm text-gray-500">July 1, 2025 • Principal & Interest</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">$2,156.78</div>
                    <div className="text-sm text-gray-500">Auto Payment</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Property tax payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Property Tax Payment</div>
                      <div className="text-sm text-gray-500">June 30, 2025 • City of Toronto</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold">$845.67</div>
                    <div className="text-sm text-gray-500">Quarterly Payment</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Home insurance payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Home Insurance Payment</div>
                      <div className="text-sm text-gray-500">June 25, 2025 • Annual Premium</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-600 font-semibold">$1,956.89</div>
                    <div className="text-sm text-gray-500">Annual Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="View renewal options">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Renewal Options</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="View statements">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">View Statements</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Contact advisor">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Contact Advisor</span>
                </button>
              </div>
            </div>

            {/* Mortgage Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Mortgage Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Payment calculator">
                  <div className="font-medium text-gray-900">Payment Calculator</div>
                  <div className="text-sm text-gray-500">Calculate payments for different scenarios</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Prepayment calculator">
                  <div className="font-medium text-gray-900">Prepayment Calculator</div>
                  <div className="text-sm text-gray-500">See how extra payments save interest</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Refinancing calculator">
                  <div className="font-medium text-gray-900">Refinancing Options</div>
                  <div className="text-sm text-gray-500">Explore refinancing benefits</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Home equity calculator">
                  <div className="font-medium text-gray-900">Home Equity</div>
                  <div className="text-sm text-gray-500">Calculate your home's equity</div>
                </button>
              </div>
            </div>

            {/* Current Rates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Mortgage Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">5-Year Fixed</span>
                  <span className="font-medium">4.79%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">5-Year Variable</span>
                  <span className="font-medium">Prime - 0.15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">3-Year Fixed</span>
                  <span className="font-medium">4.64%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">10-Year Fixed</span>
                  <span className="font-medium">5.14%</span>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Rates are subject to approval and may vary based on your profile
                </div>
                <button className="w-full text-[#005DAA] hover:text-[#004080] font-medium text-sm border border-[#005DAA] rounded px-4 py-2 mt-3">
                  Get Pre-Approved
                </button>
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Property Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-500 text-sm">Property Address</div>
                  <div className="font-medium">123 Main Street</div>
                  <div className="font-medium">Toronto, ON M5V 3A1</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Estimated Value</div>
                  <div className="font-medium">$875,000</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Loan-to-Value Ratio</div>
                  <div className="font-medium">39.2%</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Home Equity</div>
                  <div className="font-medium text-green-600">$532,433</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
