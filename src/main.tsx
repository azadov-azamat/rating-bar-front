import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const LazyApp = React.lazy(() => import('./App.tsx'))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <ThemeProvider>
                <LazyApp/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(app)

