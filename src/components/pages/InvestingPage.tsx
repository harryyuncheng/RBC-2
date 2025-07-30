'use client';

interface InvestingPageProps {
  isMobile: boolean;
}

export default function InvestingPage({ isMobile }: InvestingPageProps) {
  if (isMobile) {
    return (
      <main className="bg-gray-50 min-h-screen" role="main" aria-label="Investing Page">
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
            <h1 className="text-2xl font-bold text-gray-900">Investing</h1>
            <p className="text-gray-600 mt-1">Grow your wealth with smart investments</p>
          </div>

          {/* Portfolio Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" aria-label="Portfolio summary">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h2>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">$47,892.34</div>
              <div className="text-sm text-gray-500">Total Portfolio Value</div>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Today's Change</div>
                <div className="text-green-600 font-semibold">+$324.12 (+0.68%)</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Return</div>
                <div className="text-green-600 font-semibold">+$4,892.34 (+11.4%)</div>
              </div>
            </div>
          </div>

          {/* Investment Accounts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Accounts</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg" aria-label="RRSP account">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">RBC RRSP</div>
                    <div className="text-sm text-gray-500">Retirement Savings</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$28,456.78</div>
                    <div className="text-sm text-green-600">+$156.23 today</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg" aria-label="TFSA account">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900">RBC TFSA</div>
                    <div className="text-sm text-gray-500">Tax-Free Savings</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$19,435.56</div>
                    <div className="text-sm text-green-600">+$167.89 today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Holdings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Holdings</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center" aria-label="Holding: RBC Canadian Index Fund">
                <div>
                  <div className="font-medium text-gray-900">RBC Canadian Index Fund</div>
                  <div className="text-sm text-gray-500">35% of portfolio</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$16,762.32</div>
                  <div className="text-sm text-green-600">+1.2%</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center" aria-label="Holding: US Index Fund">
                <div>
                  <div className="font-medium text-gray-900">RBC US Index Fund</div>
                  <div className="text-sm text-gray-500">28% of portfolio</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$13,409.86</div>
                  <div className="text-sm text-green-600">+0.8%</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center" aria-label="Holding: Bond Index Fund">
                <div>
                  <div className="font-medium text-gray-900">RBC Bond Index Fund</div>
                  <div className="text-sm text-gray-500">20% of portfolio</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">$9,578.47</div>
                  <div className="text-sm text-red-600">-0.3%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Buy investments">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Buy</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="Sell investments">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Sell</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="View research">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Research</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50" aria-label="View portfolio details">
                <div className="w-8 h-8 bg-[#005DAA] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium">Details</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen" role="main" aria-label="Investing Page">
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
          <h1 className="text-3xl font-bold text-gray-900">Investing</h1>
          <p className="text-gray-600 mt-2">Build wealth for your future with our investment solutions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Portfolio overview">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
                <div className="text-sm text-gray-500">As of July 30, 2025</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900 mb-2">$47,892.34</div>
                  <div className="text-sm text-gray-600">Total Portfolio Value</div>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">+$324.12</div>
                  <div className="text-sm text-gray-600">Today's Change (+0.68%)</div>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">+11.4%</div>
                  <div className="text-sm text-gray-600">Total Return</div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                  <div>Portfolio Performance Chart</div>
                  <div className="text-sm">6-month view</div>
                </div>
              </div>
            </div>

            {/* Investment Accounts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Accounts</h2>
              
              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="RRSP account details">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">RBC RRSP</h3>
                      <p className="text-gray-600">Registered Retirement Savings Plan</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$28,456.78</div>
                      <div className="text-sm text-green-600">+$156.23 today</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Contribution Room</div>
                      <div className="font-medium">$12,543.22</div>
                    </div>
                    <div>
                      <div className="text-gray-500">YTD Contributions</div>
                      <div className="font-medium">$3,500.00</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Return</div>
                      <div className="font-medium text-green-600">+8.9%</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg" aria-label="TFSA account details">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">RBC TFSA</h3>
                      <p className="text-gray-600">Tax-Free Savings Account</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">$19,435.56</div>
                      <div className="text-sm text-green-600">+$167.89 today</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Contribution Room</div>
                      <div className="font-medium">$22,564.44</div>
                    </div>
                    <div>
                      <div className="text-gray-500">YTD Contributions</div>
                      <div className="font-medium">$2,000.00</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Return</div>
                      <div className="font-medium text-green-600">+14.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Holdings</h2>
                <button className="text-[#005DAA] hover:text-[#004080] font-medium" aria-label="View all holdings">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Holding: RBC Canadian Index Fund">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-blue-600">CDN</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">RBC Canadian Index Fund</div>
                      <div className="text-sm text-gray-500">RBF556 • 35% of portfolio</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$16,762.32</div>
                    <div className="text-sm text-green-600">+$201.45 (+1.2%)</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Holding: US Index Fund">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-green-600">US</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">RBC US Index Fund</div>
                      <div className="text-sm text-gray-500">RBF557 • 28% of portfolio</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$13,409.86</div>
                    <div className="text-sm text-green-600">+$107.28 (+0.8%)</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg" aria-label="Holding: Bond Index Fund">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-yellow-600">BND</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">RBC Bond Index Fund</div>
                      <div className="text-sm text-gray-500">RBF558 • 20% of portfolio</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">$9,578.47</div>
                    <div className="text-sm text-red-600">-$28.74 (-0.3%)</div>
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
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Buy investments">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Buy Investments</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Sell investments">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Sell Investments</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="Contribute to accounts">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Contribute</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg" aria-label="View investment research">
                  <div className="w-10 h-10 bg-[#005DAA] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Research</span>
                </button>
              </div>
            </div>

            {/* Market Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Market Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center" aria-label="TSX market index">
                  <div>
                    <div className="font-medium text-gray-900">TSX</div>
                    <div className="text-sm text-gray-500">20,456.78</div>
                  </div>
                  <div className="text-green-600 text-sm font-medium">+0.8%</div>
                </div>
                
                <div className="flex justify-between items-center" aria-label="S&P 500 market index">
                  <div>
                    <div className="font-medium text-gray-900">S&P 500</div>
                    <div className="text-sm text-gray-500">4,567.89</div>
                  </div>
                  <div className="text-green-600 text-sm font-medium">+1.2%</div>
                </div>
                
                <div className="flex justify-between items-center" aria-label="NASDAQ market index">
                  <div>
                    <div className="font-medium text-gray-900">NASDAQ</div>
                    <div className="text-sm text-gray-500">14,234.56</div>
                  </div>
                  <div className="text-red-600 text-sm font-medium">-0.3%</div>
                </div>
              </div>
            </div>

            {/* Investment Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Investment Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Goal planning tool">
                  <div className="font-medium text-gray-900">Goal Planning</div>
                  <div className="text-sm text-gray-500">Plan for retirement, education, and more</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Risk assessment tool">
                  <div className="font-medium text-gray-900">Risk Assessment</div>
                  <div className="text-sm text-gray-500">Find your investment comfort zone</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg" aria-label="Portfolio rebalancing tool">
                  <div className="font-medium text-gray-900">Rebalancing</div>
                  <div className="text-sm text-gray-500">Keep your portfolio on track</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
