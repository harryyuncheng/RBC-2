'use client';

interface LoansPageProps {
  isMobile: boolean;
}

export default function LoansPage({ isMobile }: LoansPageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Loans and Lines of Credit Page">
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
            <h1 className="text-2xl font-bold text-gray-900">Loans & Lines of Credit</h1>
            <p className="text-gray-600 mt-1">Manage your lending products</p>
          </div>

          {/* My Loans */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="My loans and lines of credit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Loans & Lines of Credit</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg" aria-label="Personal line of credit">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-gray-900">RBC Personal Line of Credit</div>
                    <div className="text-sm text-gray-500">Account ****3456</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">$2,450.00</div>
                    <div className="text-sm text-gray-500">Current Balance</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Credit Limit</div>
                    <div className="font-medium">$15,000</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Available</div>
                    <div className="font-medium text-green-600">$12,550</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Interest Rate</div>
                    <div className="font-medium">Prime + 2.5%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Next Payment</div>
                    <div className="font-medium">$49.00 - Aug 15</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg" aria-label="Personal loan">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-gray-900">RBC Personal Loan</div>
                    <div className="text-sm text-gray-500">Account ****7890</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">$8,742.35</div>
                    <div className="text-sm text-gray-500">Remaining Balance</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Original Amount</div>
                    <div className="font-medium">$15,000</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Interest Rate</div>
                    <div className="font-medium">6.95%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Monthly Payment</div>
                    <div className="font-medium">$287.50</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Next Payment</div>
                    <div className="font-medium">Aug 20, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Total Monthly Payments</div>
                  <div className="text-sm text-gray-500">Due August 15-20</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">$336.50</div>
                  <div className="text-sm text-orange-600">Due Soon</div>
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
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Apply for loan">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Apply</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="View statements">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Statements</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Calculate loan">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Calculator</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Personal loan payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Personal Loan Payment</div>
                    <div className="text-sm text-gray-500">July 20, 2025</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">$287.50</div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Line of credit interest">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Line of Credit Interest</div>
                    <div className="text-sm text-gray-500">July 15, 2025</div>
                  </div>
                </div>
                <div className="text-red-600 font-medium">$15.75</div>
              </div>
              
              <div className="flex justify-between items-center py-3" aria-label="Activity: Line of credit advance">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Line of Credit Advance</div>
                    <div className="text-sm text-gray-500">July 10, 2025</div>
                  </div>
                </div>
                <div className="text-blue-600 font-medium">$500.00</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Loans and Lines of Credit Page">
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
          <h1 className="text-3xl font-bold text-gray-900">Loans & Lines of Credit</h1>
          <p className="text-gray-600 mt-2">Manage your borrowing products and payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Loans Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Loans and lines of credit overview">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Loans & Lines of Credit</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="Apply for new loan">
                  Apply for New Loan
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="Personal line of credit details">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">RBC Personal Line of Credit</h3>
                        <p className="text-gray-600">Account ****3456</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$2,450.00</div>
                      <div className="text-sm text-gray-500">Current Balance</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Credit Limit</div>
                      <div className="font-medium text-lg">$15,000</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Available Credit</div>
                      <div className="font-medium text-lg text-green-600">$12,550</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Interest Rate</div>
                      <div className="font-medium text-lg">Prime + 2.5%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Minimum Payment</div>
                      <div className="font-medium text-lg">$49.00</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Credit Utilization</span>
                      <span className="font-medium">16.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '16.3%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="Personal loan details">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">RBC Personal Loan</h3>
                        <p className="text-gray-600">Account ****7890</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$8,742.35</div>
                      <div className="text-sm text-gray-500">Remaining Balance</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Original Amount</div>
                      <div className="font-medium text-lg">$15,000</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Interest Rate</div>
                      <div className="font-medium text-lg">6.95%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Monthly Payment</div>
                      <div className="font-medium text-lg">$287.50</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Term Remaining</div>
                      <div className="font-medium text-lg">31 months</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Loan Progress</span>
                      <span className="font-medium">41.7% paid</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '41.7%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Schedule</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="View full schedule">
                  View Full Schedule
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 border border-orange-200 rounded-lg" aria-label="Upcoming payment for personal loan">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Personal Loan Payment</div>
                      <div className="text-sm text-gray-500">Due August 20, 2025</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">$287.50</div>
                    <div className="text-sm text-orange-600">Due in 21 days</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg" aria-label="Upcoming payment for line of credit">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Line of Credit Minimum Payment</div>
                      <div className="text-sm text-gray-500">Due August 15, 2025</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">$49.00</div>
                    <div className="text-sm text-yellow-600">Due in 16 days</div>
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
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Personal loan payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Personal Loan Payment</div>
                      <div className="text-sm text-gray-500">July 20, 2025 • Account ****7890</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">$287.50</div>
                    <div className="text-sm text-gray-500">Principal & Interest</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Line of credit interest charge">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Interest Charge</div>
                      <div className="text-sm text-gray-500">July 15, 2025 • Line of Credit ****3456</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-semibold">$15.75</div>
                    <div className="text-sm text-gray-500">Monthly Interest</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Line of credit advance">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Line of Credit Advance</div>
                      <div className="text-sm text-gray-500">July 10, 2025 • Line of Credit ****3456</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold">$500.00</div>
                    <div className="text-sm text-gray-500">Cash Advance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900">$336.50</div>
                  <div className="text-sm text-gray-600">Total Monthly Payments</div>
                  <div className="text-xs text-orange-600 mt-1">Due in 16-21 days</div>
                </div>
                
                <button className="w-full bg-[#005DAA] text-white py-3 rounded-lg hover:bg-[#004080] font-medium" aria-label="Make payment">
                  Make Payment
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
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Apply for loan">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Apply for Loan</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="View statements">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">View Statements</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Manage auto-pay">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Manage Auto-Pay</span>
                </button>
              </div>
            </div>

            {/* Loan Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Loan Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Payment calculator">
                  <div className="font-medium text-gray-900">Payment Calculator</div>
                  <div className="text-sm text-gray-500">Calculate loan payments and interest</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Payoff calculator">
                  <div className="font-medium text-gray-900">Payoff Calculator</div>
                  <div className="text-sm text-gray-500">See how extra payments affect payoff</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Debt consolidation">
                  <div className="font-medium text-gray-900">Debt Consolidation</div>
                  <div className="text-sm text-gray-500">Explore consolidation options</div>
                </button>
              </div>
            </div>

            {/* Interest Rates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prime Rate</span>
                  <span className="font-medium">6.45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Personal Loan</span>
                  <span className="font-medium">Starting at 6.95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Line of Credit</span>
                  <span className="font-medium">Prime + 2.5%</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Rates subject to approval and may vary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
