'use client';

import { useState } from 'react';

// Import all page components
import RBCMainContent from '../RBCMainContent';
import CreditScorePage from './CreditScorePage';
import BankingPage from './BankingPage';
import InvestingPage from './InvestingPage';
import InsurancePage from './InsurancePage';
import CreditCardsPage from './CreditCardsPage';
import LoansPage from './LoansPage';
import MortgagesPage from './MortgagesPage';

export type PageType = 
  | 'dashboard' 
  | 'credit-score' 
  | 'banking' 
  | 'investing' 
  | 'insurance' 
  | 'credit-cards' 
  | 'loans' 
  | 'mortgages';

interface PageRouterProps {
  isMobile: boolean;
}

const PageRouter = ({ isMobile }: PageRouterProps): { 
  currentPage: PageType; 
  setCurrentPage: (page: PageType) => void; 
  PageComponent: React.ComponentType<{ isMobile: boolean; onNavigate?: (page: PageType) => void }>; 
} => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const getPageComponent = (): React.ComponentType<{ isMobile: boolean; onNavigate?: (page: PageType) => void }> => {
    switch (currentPage) {
      case 'credit-score':
        return CreditScorePage;
      case 'banking':
        return BankingPage;
      case 'investing':
        return InvestingPage;
      case 'insurance':
        return InsurancePage;
      case 'credit-cards':
        return CreditCardsPage;
      case 'loans':
        return LoansPage;
      case 'mortgages':
        return MortgagesPage;
      case 'dashboard':
      default:
        return (props) => <RBCMainContent {...props} onNavigate={setCurrentPage} />;
    }
  };

  return {
    currentPage,
    setCurrentPage,
    PageComponent: getPageComponent()
  };
};

export default PageRouter;
