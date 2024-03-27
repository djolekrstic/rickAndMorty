import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, CharacterPage, CharactersPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <CharactersPage />,
      },
      {
        path: ":id",
        element: <CharacterPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
