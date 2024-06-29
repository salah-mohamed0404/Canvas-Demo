import { Navigate, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import ParallelSystem from "./pages/ParallelSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/parallel" />,
  },
  {
    path: "/parallel",
    element: <ParallelSystem />,
  },
]);
