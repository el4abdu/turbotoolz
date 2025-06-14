import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: #4F46E5;
            --secondary: #3B82F6;
            --accent: #F59E0B;
            --light: #F9FAFB;
            --dark: #111827;
          }
          
          /* Ensure the page doesn't flash before CSS loads */
          body {
            background-color: var(--light);
            color: var(--dark);
            transition: background-color 0.3s, color 0.3s;
          }
          
          @media (prefers-color-scheme: dark) {
            body {
              background-color: var(--dark);
              color: var(--light);
            }
          }
          
          .dark {
            background-color: var(--dark);
            color: var(--light);
          }
          
          /* Hide elements until JS loads */
          .js-loading * {
            transition: none !important;
          }
        `}} />
        
        {/* Preload script to prevent flashing */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            document.documentElement.classList.add('js-loading');
            
            // Check for saved theme preference or use system preference
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const hasThemePreference = localStorage.getItem('theme');
            
            if (hasThemePreference === 'dark' || (!hasThemePreference && darkModeMediaQuery.matches)) {
              document.documentElement.classList.add('dark');
            }
            
            // Remove loading class after everything is loaded
            window.addEventListener('load', () => {
              document.documentElement.classList.remove('js-loading');
            });
          })();
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 