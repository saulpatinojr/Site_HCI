import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

const SessionizeWidget = ({ type = 'sessions' }) => {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeHeight, setIframeHeight] = useState('400px');

  const scriptSrc = type === 'sessions' 
    ? 'https://sessionize.com/api/speaker/sessions/c6yicoezls/0x0x3fb393x'
    : 'https://sessionize.com/api/speaker/events/c6yicoezls/0x0x5d5d5dx';

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'sessionize-resize' && event.data.height) {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const iframe = iframeRef.current;

    const loadContent = () => {
      if (!iframe) return;

      setLoading(true);
      setError(null);
      
      try {
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Sessionize Content</title>
            <style>
              body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; overflow: hidden; }
              .sz-session--table { width: 100% !important; }
            </style>
          </head>
          <body>
            <script type="text/javascript" src="${scriptSrc}"></script>
            <script>
              try {
                const ro = new ResizeObserver(entries => {
                  for (let entry of entries) {
                    const height = entry.target.scrollHeight;
                    window.parent.postMessage({ type: 'sessionize-resize', height: height }, '*');
                  }
                });
                ro.observe(document.body);
              } catch (e) {
                // Fallback for older browsers
                let lastHeight = 0;
                setInterval(() => {
                  const newHeight = document.body.scrollHeight;
                  if (newHeight !== lastHeight) {
                    lastHeight = newHeight;
                    window.parent.postMessage({ type: 'sessionize-resize', height: newHeight }, '*');
                  }
                }, 500);
              }
            </script>
          </body>
          </html>
        `);
        iframeDoc.close();
      } catch (e) {
        if(isMounted) {
          setError("Failed to load widget content into the container.");
        }
      } finally {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 500); 
      }
    };

    if (iframe) {
      iframe.addEventListener('load', loadContent);
    }
    
    loadContent();

    return () => {
      isMounted = false;
      if (iframe) {
        iframe.removeEventListener('load', loadContent);
      }
    };
  }, [scriptSrc]);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/50" style={{ height: '400px' }}>
          <Loader2 className="w-8 h-8 text-slate-blue animate-spin" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center py-10 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertTriangle className="w-8 h-8 mr-4" />
          <div>
            <p className="font-bold">Failed to load Sessionize widget.</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="about:blank"
        title="Sessionize Speaker Sessions"
        style={{ 
          width: '100%', 
          border: 'none', 
          height: iframeHeight, 
          visibility: loading ? 'hidden' : 'visible',
          transition: 'height 0.3s ease-in-out'
        }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default SessionizeWidget;