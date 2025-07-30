'use client';

interface CreditScorePageProps {
  isMobile: boolean;
  onNavigate?: (page: string) => void;
}

export default function CreditScorePage({ isMobile, onNavigate }: CreditScorePageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Credit Score Page">
        <div className="p-4">
          <div className="mb-6">
            <button 
              className="flex items-center text-[#005DAA] mb-4"
              onClick={() => onNavigate?.('dashboard')}
              aria-label="Go back to main page"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Credit Score Report</h1>
          </div>

          {/* Credit Score Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="Credit Score Summary">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-green-600 mb-2" aria-label="Credit score 762">762</div>
              <div className="text-lg text-gray-600 mb-4">Excellent</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '76%' }} aria-label="76% on credit score scale"></div>
              </div>
              <div className="text-sm text-gray-500">Last updated: July 25, 2025</div>
            </div>
          </div>

          {/* Credit Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Factors Affecting Your Score</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center" aria-label="Payment history factor">
                <div>
                  <div className="font-medium text-gray-900">Payment History</div>
                  <div className="text-sm text-gray-500">35% of your score</div>
                </div>
                <div className="text-green-600 font-medium">Excellent</div>
              </div>
              
              <div className="flex justify-between items-center" aria-label="Credit utilization factor">
                <div>
                  <div className="font-medium text-gray-900">Credit Utilization</div>
                  <div className="text-sm text-gray-500">30% of your score</div>
                </div>
                <div className="text-green-600 font-medium">Good</div>
              </div>
              
              <div className="flex justify-between items-center" aria-label="Credit history length factor">
                <div>
                  <div className="font-medium text-gray-900">Length of Credit History</div>
                  <div className="text-sm text-gray-500">15% of your score</div>
                </div>
                <div className="text-yellow-600 font-medium">Fair</div>
              </div>
            </div>
          </div>

          {/* Credit Accounts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Accounts</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4" aria-label="RBC Rewards Visa credit card">
                <div className="font-medium text-gray-900">RBC Rewards Visa</div>
                <div className="text-sm text-gray-500">$1,200 / $5,000 limit</div>
                <div className="text-sm text-green-600">Good standing</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4" aria-label="RBC Cash Back MasterCard">
                <div className="font-medium text-gray-900">RBC Cash Back MasterCard</div>
                <div className="text-sm text-gray-500">$0 / $3,000 limit</div>
                <div className="text-sm text-green-600">Good standing</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Credit Score Page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            className="flex items-center text-[#005DAA] mb-6 hover:text-[#004080]"
            onClick={() => onNavigate?.('dashboard')}
            aria-label="Go back to main page"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Credit Score Report</h1>
          <p className="text-gray-600 mt-2">Monitor your credit health and track improvements over time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Credit Score */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8" aria-label="Credit Score Summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-4" aria-label="Credit score 762">762</div>
                  <div className="text-xl text-gray-600 mb-6">Excellent</div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div className="bg-green-600 h-4 rounded-full" style={{ width: '76%' }} aria-label="76% on credit score scale"></div>
                  </div>
                  <div className="text-sm text-gray-500">Range: 300 - 850</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Score Change</h3>
                    <div className="flex items-center">
                      <span className="text-green-600 font-medium">+12 points</span>
                      <span className="text-gray-500 ml-2">from last month</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Last Updated</h3>
                    <div className="text-gray-600">July 25, 2025</div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Next Update</h3>
                    <div className="text-gray-600">August 25, 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Factors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Factors Affecting Your Score</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg" aria-label="Payment history factor">
                  <div>
                    <div className="font-semibold text-gray-900">Payment History</div>
                    <div className="text-sm text-gray-600">35% of your score</div>
                    <div className="text-sm text-gray-500 mt-1">You've made all payments on time</div>
                  </div>
                  <div className="text-green-600 font-semibold text-lg">Excellent</div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg" aria-label="Credit utilization factor">
                  <div>
                    <div className="font-semibold text-gray-900">Credit Utilization</div>
                    <div className="text-sm text-gray-600">30% of your score</div>
                    <div className="text-sm text-gray-500 mt-1">Using 24% of available credit</div>
                  </div>
                  <div className="text-green-600 font-semibold text-lg">Good</div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg" aria-label="Credit history length factor">
                  <div>
                    <div className="font-semibold text-gray-900">Length of Credit History</div>
                    <div className="text-sm text-gray-600">15% of your score</div>
                    <div className="text-sm text-gray-500 mt-1">Average age: 3 years, 2 months</div>
                  </div>
                  <div className="text-yellow-600 font-semibold text-lg">Fair</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credit Monitoring */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Credit Monitoring</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Alerts</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Identity Protection</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Protected</span>
                </div>
                <button className="w-full text-[#005DAA] hover:text-[#004080] font-medium text-sm border border-[#005DAA] rounded px-4 py-2">
                  Manage Settings
                </button>
              </div>
            </div>

            {/* Credit Accounts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Credit Accounts</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4" aria-label="RBC Rewards Visa credit card">
                  <div className="font-medium text-gray-900">RBC Rewards Visa</div>
                  <div className="text-sm text-gray-500">$1,200 / $5,000 limit</div>
                  <div className="text-sm text-green-600">Good standing</div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4" aria-label="RBC Cash Back MasterCard">
                  <div className="font-medium text-gray-900">RBC Cash Back MasterCard</div>
                  <div className="text-sm text-gray-500">$0 / $3,000 limit</div>
                  <div className="text-sm text-green-600">Good standing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
