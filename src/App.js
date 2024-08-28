import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/master/Home';
import Layout from './pages/master/Layout';

function App() {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <Layout />,
                // errorElement: <ErrorPage />,
                children: [
                    { path: '/', element: <Home /> },
                ],
            },
        ]
    )

    return <RouterProvider router={router} />;
}

export default App;
