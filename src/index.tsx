import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
)
