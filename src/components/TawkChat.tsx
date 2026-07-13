import { useEffect } from 'react';

interface TawkChatProps {
  chatEnabled: boolean;
}

export default function TawkChat({ chatEnabled }: TawkChatProps) {
  useEffect(() => {
    if (!chatEnabled) {
      // If chat is disabled, hide the widget if it already loaded
      if ((window as any).Tawk_API && (window as any).Tawk_API.hideWidget) {
        (window as any).Tawk_API.hideWidget();
      }
      return;
    }

    // If already loaded, just show it
    if ((window as any).Tawk_API && (window as any).Tawk_API.showWidget) {
      (window as any).Tawk_API.showWidget();
      return;
    }

    // Load the script
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a4e0d914d8ff71d4502b4dc/1jt0ea06l';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s1.id = 'tawk-script';
    // Add title to Tawk iframe for accessibility (Lighthouse audit fix)
    const addTitleToTawkIframe = () => {
      const iframes = document.querySelectorAll('iframe:not([title]), iframe[title=""]');
      iframes.forEach((iframe) => {
        iframe.setAttribute('title', 'Live Chat Support');
      });
    };

    const observer = new MutationObserver(addTitleToTawkIframe);
    observer.observe(document.body, { childList: true, subtree: true });

    s0.parentNode!.insertBefore(s1, s0);

    return () => observer.disconnect();
  }, [chatEnabled]);

  return null;
}
