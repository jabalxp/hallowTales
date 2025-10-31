/**
 * Exemplo de Uso do @vercel/analytics com ES6 Modules
 * 
 * Este arquivo demonstra como usar o pacote NPM @vercel/analytics
 * em um projeto com bundler (Vite, Webpack, Parcel, etc.)
 * 
 * NOTA: O projeto atual usa HTML puro sem bundler.
 * Este arquivo é apenas um exemplo para referência futura.
 */

// Importação do pacote instalado via npm
import { inject } from '@vercel/analytics';

// Inicializa o Vercel Analytics
inject({
  mode: 'auto', // 'auto' | 'production' | 'development'
  debug: false, // true para ver logs no console
});

console.log('✅ Vercel Analytics inicializado via ES6 module!');

// Para usar este arquivo, você precisaria:
// 1. Um bundler como Vite: npm create vite@latest
// 2. Ou Parcel: npm i -D parcel
// 3. Ou Webpack com configuração apropriada

/**
 * Exemplo com Vite (Recomendado):
 * 
 * 1. Instalar Vite:
 *    npm create vite@latest . -- --template vanilla
 * 
 * 2. Instalar analytics:
 *    npm i @vercel/analytics
 * 
 * 3. No seu main.js:
 *    import { inject } from '@vercel/analytics';
 *    inject();
 * 
 * 4. Rodar dev server:
 *    npm run dev
 * 
 * 5. Build para produção:
 *    npm run build
 */

/**
 * Exemplo com Next.js:
 * 
 * // app/layout.tsx
 * import { Analytics } from '@vercel/analytics/next';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Analytics />
 *       </body>
 *     </html>
 *   );
 * }
 */

/**
 * Exemplo com React:
 * 
 * // App.jsx
 * import { inject } from '@vercel/analytics';
 * import { useEffect } from 'react';
 * 
 * function App() {
 *   useEffect(() => {
 *     inject();
 *   }, []);
 * 
 *   return <div>Your App</div>;
 * }
 */

export { inject };
