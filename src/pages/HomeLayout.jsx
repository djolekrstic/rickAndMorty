import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <section className="app">
      <Outlet />
    </section>
  );
};

export default HomeLayout;
