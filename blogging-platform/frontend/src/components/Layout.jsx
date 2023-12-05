import React from 'react'
import SideBar from './Home/SideBar';
import RightSideBar from './Home/Side/RightSideBar';
import Header from './Home/Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-full">
      <SideBar className="h-screen fixed"/>
      <div className="flex flex-col ml-64">
        <Header headerName={'Explore'} />
        <div className="flex flex-row mt-4">
          <main className="flex-grow">{children}</main>
          <div className="relative right-2 top-2">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
