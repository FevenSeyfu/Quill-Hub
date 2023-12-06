import React from 'react'
import SideBar from './Home/SideBar';
import RightSideBar from './Home/Side/RightSideBar';
import Header from './Home/Header/Header';

const Layout = ({ children,headerName }) => {
  return (
    <div className="flex h-full">
      <SideBar className="h-screen fixed"/>
      <div className="flex flex-col ml-64">
        <Header headerName={headerName} className="fixed h-10"/>
        <div className="flex flex-row mt-4">
          <main className="flex-grow w-4/5">{children}</main>
          <RightSideBar className="fixed right-2 top-16"/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
