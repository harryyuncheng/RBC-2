'use client';

interface InsurancePageProps {
  isMobile: boolean;
}

export default function InsurancePage({ isMobile }: InsurancePageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Insurance Page">
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
            <h1 className="text-2xl font-bold text-gray-900">Insurance</h1>
            <p className="text-gray-600 mt-1">Protect what matters most</p>
          </div>

          {/* Coverage Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="Insurance coverage summary">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Coverage</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Life Insurance</div>
                  <div className="text-sm text-gray-500">Term Life Policy</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">$250,000</div>
                  <div className="text-sm text-green-600">Active</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Auto Insurance</div>
                  <div className="text-sm text-gray-500">2022 Honda Civic</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">$156/month</div>
                  <div className="text-sm text-green-600">Active</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Home Insurance</div>
                  <div className="text-sm text-gray-500">Condo Coverage</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">$89/month</div>
                  <div className="text-sm text-orange-600">Renewal Due</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="File a claim">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">File Claim</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Get a quote">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Get Quote</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Update policy">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Update Policy</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Contact advisor">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Contact</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Home insurance payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Home Insurance Payment</div>
                    <div className="text-sm text-gray-500">July 25, 2025</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">Paid</div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100" aria-label="Activity: Auto insurance payment">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Auto Insurance Payment</div>
                    <div className="text-sm text-gray-500">July 15, 2025</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">Paid</div>
              </div>
              
              <div className="flex justify-between items-center py-3" aria-label="Activity: Policy update">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Policy Update Completed</div>
                    <div className="text-sm text-gray-500">July 10, 2025</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Insurance Page">
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
          <h1 className="text-3xl font-bold text-gray-900">Insurance</h1>
          <p className="text-gray-600 mt-2">Protect what matters most with comprehensive coverage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coverage Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Insurance coverage overview">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Coverage</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="Manage all policies">
                  Manage All
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="Life insurance policy details">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Life Insurance</h3>
                        <p className="text-gray-600">Term Life Policy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$250,000</div>
                      <div className="text-sm text-green-600">Active Coverage</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Premium</div>
                      <div className="font-medium">$45/month</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Term</div>
                      <div className="font-medium">20 years</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Beneficiary</div>
                      <div className="font-medium">Sarah Johnson</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="Auto insurance policy details">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Auto Insurance</h3>
                        <p className="text-gray-600">2022 Honda Civic</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$156/month</div>
                      <div className="text-sm text-green-600">Active Coverage</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Coverage</div>
                      <div className="font-medium">Comprehensive</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Deductible</div>
                      <div className="font-medium">$500</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Renewal</div>
                      <div className="font-medium">Dec 2025</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-orange-200 rounded-lg bg-orange-50" aria-label="Home insurance policy details">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Home Insurance</h3>
                        <p className="text-gray-600">Condo Coverage</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$89/month</div>
                      <div className="text-sm text-orange-600">Renewal Due Soon</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Coverage</div>
                      <div className="font-medium">$150,000</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Deductible</div>
                      <div className="font-medium">$1,000</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Renewal</div>
                      <div className="font-medium text-orange-600">Aug 15, 2025</div>
                    </div>
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
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Home insurance payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Home Insurance Payment</div>
                      <div className="text-sm text-gray-500">July 25, 2025 • $89.00</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">Paid</div>
                    <div className="text-sm text-gray-500">Auto-Pay</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Auto insurance payment">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Auto Insurance Payment</div>
                      <div className="text-sm text-gray-500">July 15, 2025 • $156.00</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">Paid</div>
                    <div className="text-sm text-gray-500">Auto-Pay</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Activity: Policy update">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Policy Update Completed</div>
                      <div className="text-sm text-gray-500">July 10, 2025 • Life Insurance</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold">Complete</div>
                    <div className="text-sm text-gray-500">Updated</div>
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
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="File a claim">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">File a Claim</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Get a quote">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Get Quote</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Update policy">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Update Policy</span>
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

            {/* Important Notices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Important Notices</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Renewal Due</div>
                      <div className="text-sm text-gray-600">Your home insurance policy expires on August 15, 2025</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">New Discount Available</div>
                      <div className="text-sm text-gray-600">Bundle your policies to save up to 15%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Insurance Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Coverage calculator">
                  <div className="font-medium text-gray-900">Coverage Calculator</div>
                  <div className="text-sm text-gray-500">Determine how much coverage you need</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Policy comparison tool">
                  <div className="font-medium text-gray-900">Policy Comparison</div>
                  <div className="text-sm text-gray-500">Compare different insurance options</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Claims tracker">
                  <div className="font-medium text-gray-900">Claims Tracker</div>
                  <div className="text-sm text-gray-500">Track the status of your claims</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
