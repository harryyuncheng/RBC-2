export const captureDOMContext = (): string => {
  try {
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      pathname: window.location.pathname
    };

    const bodyText = document.body.innerText.slice(0, 2000);
    
    const forms = Array.from(document.forms).map(form => ({
      name: form.name || 'unnamed',
      elements: Array.from(form.elements).map(el => ({
        type: el.type || 'unknown',
        name: el.name || 'unnamed',
        value: el.tagName === 'INPUT' ? (el as HTMLInputElement).value : ''
      }))
    }));

    return JSON.stringify({
      page: pageInfo,
      visibleText: bodyText,
      forms: forms
    }, null, 2);
  } catch (error) {
    console.error('Failed to capture DOM context:', error);
    return 'Failed to capture page context';
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
