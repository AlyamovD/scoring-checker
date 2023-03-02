import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// const Home = React.lazy(() => import("pages/home"));
// const FormLayout = React.lazy(() => import("pages/form/layout"));
// const FormConstructor = React.lazy(() => import("pages/form/constructor"));
// const FormPreview = React.lazy(() => import("pages/form/preview"));
// const FormJSON = React.lazy(() => import("pages/form/json"));
import Home from "pages/home";
import FormLayout from "pages/form/layout";
import FormConstructor from "pages/form/constructor";
import FormPreview from "pages/form/preview";
import FormJSON from "pages/form/json";

const Routes: React.FC = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <FormLayout />,
      children: [
        {
          path: "/form/:id/constructor",
          element: <FormConstructor />,
        },
        {
          path: "/form/:id/preview",
          element: <FormPreview />,
        },
        {
          path: "/form/:id/json",
          element: <FormJSON />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return <Suspense fallback={<>Загрузка...</>}>{routes}</Suspense>;
};

export default Routes;
