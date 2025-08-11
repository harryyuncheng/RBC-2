export interface StructuredAction {
  target: string;
  label: string;
  action: "highlight" | "open";
}

/**
 * Extracts structured actions from Curtis response text
 */
export function extractStructuredActions(responseText: string): StructuredAction[] {
  if (!responseText) return [];

  try {
    // Look for the ACTIONS array in the response
    const actionsMatch = responseText.match(/ACTIONS:\s*(\[[\s\S]*?\])/);
    if (!actionsMatch) return [];

    // Parse the JSON array
    const actionsArray = JSON.parse(actionsMatch[1]);
    
    // Validate the structure
    if (!Array.isArray(actionsArray)) return [];
    
    return actionsArray.filter((action: StructuredAction) => 
      action && 
      typeof action.target === 'string' && 
      typeof action.label === 'string' && 
      (action.action === 'highlight' || action.action === 'open')
    );
  } catch (error) {
    console.warn('Failed to parse structured actions:', error);
    return [];
  }
}

/**
 * Helper function to find elements by text content
 */
function findElementByText(selector: string, text: string): Element | null {
  const elements = document.querySelectorAll(selector);
  for (const el of elements) {
    if (el.textContent?.toLowerCase().includes(text.toLowerCase())) {
      return el;
    }
  }
  return null;
}

/**
 * Finds DOM element using multiple fallback strategies
 */
export function findElementByTarget(target: string): Element | null {
  if (!target) return null;

  // Strategy 1: Direct ID match
  let element: Element | null = document.getElementById(target);
  if (element) return element;

  // Strategy 2: Data attribute match
  element = document.querySelector(`[data-target="${target}"]`);
  if (element) return element;

  // Strategy 3: Class name contains target
  element = document.querySelector(`.${target}`);
  if (element) return element;

  // Strategy 4: Text content matching (case insensitive, partial)
  const allElements = document.querySelectorAll('button, a, [role="button"], [role="link"], .btn, .button');
  for (const el of allElements) {
    const text = el.textContent?.toLowerCase().trim() || '';
    const targetLower = target.toLowerCase();
    
    // Exact match
    if (text === targetLower) return el;
    
    // Partial match for compound targets like "chequing_view_details"
    if (targetLower.includes('_')) {
      const parts = targetLower.split('_');
      if (parts.every(part => text.includes(part))) return el;
    }
  }

  // Strategy 5: Semantic matching for common banking UI patterns
  const semanticMappings: Record<string, string[]> = {
    'menu': ['[role="navigation"]', '.menu', '.nav', 'nav', '[aria-label*="menu"]'],
    'transfer': ['[aria-label*="transfer"]', 'button:contains("Transfer")', '.transfer'],
    'view_details': ['button:contains("View Details")', 'a:contains("View Details")', '.view-details'],
    'credit_cards': ['a:contains("Credit Cards")', '[href*="credit"]', '.credit-cards'],
    'accounts': ['a:contains("Accounts")', '[href*="account"]', '.accounts'],
    'chequing': ['.chequing', '[data-account-type="chequing"]'],
    'savings': ['.savings', '[data-account-type="savings"]'],
    'offers': ['.offers', '[data-section="offers"]', 'h3:contains("Offers")', 'h4:contains("Offers")'],
    'learn_more': ['a:contains("Learn More")', 'button:contains("Learn More")', '.learn-more'],
    'messages': ['.messages', '[data-section="messages"]', 'h3:contains("Messages")'],
    'quicklinks': ['.quick-links', '.quicklinks', '[data-section="quicklinks"]'],
    'footer': ['footer', '.footer', '[role="contentinfo"]'],
    'products_services': ['a:contains("Products & Services")', '[href*="products"]'],
    'help_centre': ['a:contains("Help Centre")', '[href*="help"]'],
    'statements': ['a:contains("Statements")', '.statements'],
    'feedback': ['button:contains("Feedback")', '.feedback'],
    'sign_out': ['button:contains("Sign Out")', 'a:contains("Sign Out")', '.sign-out']
  };

  // Try semantic mappings
  for (const [key, selectors] of Object.entries(semanticMappings)) {
    if (target.toLowerCase().includes(key)) {
      for (const selector of selectors) {
        // Handle text-based selectors using helper function
        if (selector.includes(':contains(')) {
          const [baseSelector, containsText] = selector.split(':contains(');
          const text = containsText.replace(/[()'"]/g, '');
          element = findElementByText(baseSelector, text);
          if (element) return element;
        } else {
          element = document.querySelector(selector);
          if (element) return element;
        }
      }
    }
  }

  // Strategy 6: Compound target matching (e.g., "offers_learn_more")
  if (target.includes('_')) {
    const parts = target.split('_');
    
    // Special handling for specific compound targets
    if (target === 'offers_learn_more') {
      // Look for "Learn More" within an offers section
      const offersSection = document.querySelector('.bg-blue-50') || 
                           findElementByText('h3, h4', 'Offers') || 
                           document.querySelector('[data-section="offers"]');
      if (offersSection) {
        const learnMoreInOffers = findElementByText('a, button', 'Learn More');
        if (learnMoreInOffers && offersSection.contains(learnMoreInOffers)) {
          return learnMoreInOffers;
        }
      }
      
      // Fallback: any "Learn More" link/button
      const learnMoreElement = findElementByText('a, button', 'Learn More');
      if (learnMoreElement) return learnMoreElement;
    }
    
    if (target.startsWith('chequing_') || target.startsWith('savings_')) {
      const accountType = parts[0];
      const action = parts.slice(1).join(' ');
      
      // Find the account section first
      const accountElement = findElementByText('h3, h4, .account-header', accountType);
      if (accountElement) {
        const accountSection = accountElement.closest('.p-6, .border-b, .account-section') || accountElement.parentElement;
        if (accountSection) {
          // Look for the specific action within this account section
          const actionEl = findElementByText('a, button', action);
          if (actionEl && accountSection.contains(actionEl)) return actionEl;
          
          // Try variations
          if (action === 'view details') {
            const viewDetailsEl = accountSection.querySelector('a[href*="details"]') || 
                                 findElementByText('button, a', 'View') || 
                                 findElementByText('button, a', 'Details');
            if (viewDetailsEl && accountSection.contains(viewDetailsEl)) return viewDetailsEl;
          }
        }
      }
    }
    
    if (target.startsWith('footer_')) {
      const footerText = parts.slice(1).join(' ');
      const footer = document.querySelector('footer, .footer, [role="contentinfo"]');
      if (footer) {
        const footerLink = findElementByText('a', footerText);
        if (footerLink && footer.contains(footerLink)) return footerLink;
      }
    }
    
    if (target.startsWith('quicklinks_')) {
      const linkText = parts.slice(1).join(' ');
      const quickLinksSection = findElementByText('h3', 'Quick Links') || 
                               document.querySelector('.quick-links, .quicklinks');
      if (quickLinksSection) {
        const quickLinkParent = quickLinksSection.closest('.bg-white, .border, .p-6') || quickLinksSection.parentElement;
        if (quickLinkParent) {
          const linkEl = findElementByText('a', linkText);
          if (linkEl && quickLinkParent.contains(linkEl)) return linkEl;
        }
      }
    }
  }

  console.warn(`Could not find element for target: ${target}`);
  return null;
}

/**
 * Gets the bounding rectangle of an element relative to the viewport
 */
export function getElementBounds(element: Element): DOMRect {
  return element.getBoundingClientRect();
}

/**
 * Executes a structured action
 */
export function executeAction(action: StructuredAction): boolean {
  const element = findElementByTarget(action.target);
  if (!element) return false;

  switch (action.action) {
    case 'open':
      // Trigger click on the element
      if (element instanceof HTMLElement) {
        element.click();
        return true;
      }
      break;
    
    case 'highlight':
      // Highlighting is handled by the ActionHighlighter component
      return true;
    
    default:
      console.warn(`Unknown action type: ${action.action}`);
      return false;
  }

  return false;
}
