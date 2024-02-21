import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootElement, {loader as rootLoader, action as rootAction} from './Components/RootElement';
import ErrorPage from './Components/ErrorElement';
import Movie, {loader as movieLoader} from './Components/Movie'
import {action as editAction} from './Components/EditMovie';
import EditMovie from './Components/EditMovie';
import { action as deleteAction } from './Components/Destroy';


export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootElement />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
            action: rootAction,
            children: [
                {
                    path: "/movies/:id",
                    element: <Movie />,
                    loader: movieLoader as any,
                },
                {
                    path: "/movies/:id/edit",
                    element: <EditMovie />,
                    loader: movieLoader as any,
                    action: editAction as any
                },
                {
                    path: "/movies/:id/destroy",
                    action: deleteAction as any,
                    
                }
                
            ]
        },
        

    ]);
    return <RouterProvider router={router} />;
}