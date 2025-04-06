import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout";

const ActivityTracker = lazy(() => import("../pages/activity-tracker"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ActivityTracker />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
