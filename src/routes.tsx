import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useDispatch } from "store/hooks";

import Home from "pages/home";
import FormLayout from "pages/form/layout";
import FormConstructor from "pages/form/constructor";
import FormPreview from "pages/form/preview";
import FormJSON from "pages/form/json";

const Routes: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    dispatch.forms.FETCH_GET_ALL_FORMS();
  }, [dispatch]);

  return <Suspense fallback={<>Загрузка...</>}>{routes}</Suspense>;
};

export default Routes;
