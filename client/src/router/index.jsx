import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotesBoardPage from "../pages/NotesBoardPage";
import CreateNotePage from "../pages/CreateNotePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import NoAuthGuard from "../layouts/NoAuthGuard";
import NotFound from "../pages/NotFound";
import AuthGuard from "../layouts/AuthGuard";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/notes",
        element: (
          <NoAuthGuard>
            <NotesBoardPage />
          </NoAuthGuard>
        ),
      },
      {
        path: "/notes/:noteId",
        element: (
          <NoAuthGuard>
            <CreateNotePage />
          </NoAuthGuard>
        ),
      },
      {
        path: "/create",
        element: (
          <NoAuthGuard>
            <CreateNotePage />
          </NoAuthGuard>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: (
          <AuthGuard>
            <SignIn />
          </AuthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthGuard>
            <SignUp />
          </AuthGuard>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
