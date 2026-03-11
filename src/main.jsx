import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from  "react-redux";
import {store} from "./store.js"
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "./growthbook";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GrowthBookProvider growthbook={growthbook}>
      <Provider store={store} >
        <App />
      </Provider>
    </GrowthBookProvider>
  </StrictMode>
)
