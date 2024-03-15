import React, { FC } from "react";
import Navbar from "./Navbar";

interface Props {
  children?: React.ReactNode;
  id?: string;
}
const Layout: FC<Props> = ({ children, id }) => {
  return (
    <>
      <div id={id} data-theme="light" className="scrollbar-hide">
        <div className="w-full grid grid-cols-5 overvlow-x-hidden scrollbar-hide">
          <div className="col-span-4">
            <div className="top-0 sticky z-50">
              <Navbar />
            </div>
            <div className="overvlow-x-hidden scrollbar-hide">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
