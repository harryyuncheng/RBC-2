// Enhanced DOM context capture
export const captureDOMContext = (): string => {
  try {
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      pathname: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    // Get visible text content (increased limit for better context)
    const bodyText = document.body.innerText.slice(0, 3000);
    
    // Capture form data with more details
    const forms = Array.from(document.forms).map(form => ({
      name: form.name || 'unnamed',
      action: form.action,
      method: form.method,
      elements: Array.from(form.elements).map(el => {
        const element = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        return {
          type: element.type || 'unknown',
          name: element.name || 'unnamed',
          id: element.id,
          placeholder: (element as HTMLInputElement).placeholder || '',
          value: element.value || '',
          required: (element as HTMLInputElement).required || false,
          disabled: element.disabled || false
        };
      })
    }));

    // Capture interactive elements
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]')).map(btn => ({
      text: btn.textContent?.trim() || '',
      id: btn.id,
      className: btn.className,
      type: (btn as HTMLInputElement).type || 'button',
      disabled: (btn as HTMLButtonElement).disabled || false
    }));

    // Capture navigation/menu items
    const navItems = Array.from(document.querySelectorAll('nav a, [role="navigation"] a, .nav a, .menu a')).map(link => ({
      text: link.textContent?.trim() || '',
      href: (link as HTMLAnchorElement).href,
      title: (link as HTMLAnchorElement).title
    }));

    // Capture headings for page structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(heading => ({
      level: heading.tagName.toLowerCase(),
      text: heading.textContent?.trim() || '',
      id: heading.id
    }));

    // Capture main content areas
    const mainContent = Array.from(document.querySelectorAll('main, [role="main"], .main-content, .content')).map(main => ({
      text: main.textContent?.slice(0, 1000) || '',
      id: main.id,
      className: main.className
    }));

    // Capture any error messages or alerts
    const alerts = Array.from(document.querySelectorAll('.alert, .error, .warning, .success, [role="alert"]')).map(alert => ({
      text: alert.textContent?.trim() || '',
      className: alert.className,
      type: alert.getAttribute('role') || 'unknown'
    }));

    return JSON.stringify({
      page: pageInfo,
      visibleText: bodyText,
      structure: {
        headings,
        mainContent
      },
      interactive: {
        forms,
        buttons,
        navigation: navItems
      },
      notifications: alerts
    }, null, 2);
  } catch (error) {
    console.error('Failed to capture DOM context:', error);
    return JSON.stringify({
      error: 'Failed to capture page context',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
};

export const loadContextPrompt = async (): Promise<string> => {
  try {
    const response = await fetch('/context-prompt.txt');
    if (response.ok) {
      return await response.text();
    } else {
      console.warn('Context prompt file not found or not accessible');
      return '';
    }
  } catch (error) {
    console.warn('Failed to load context prompt:', error instanceof Error ? error.message : 'Unknown error');
    return '';
  }
};
