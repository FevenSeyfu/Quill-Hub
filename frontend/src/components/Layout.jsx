import React from 'react'
import SideBar from './Home/SideBar';
import RightSideBar from './Home/Side/RightSideBar';
import Header from './Home/Header/Header';

const Layout = ({ children,headerName }) => {
  return (
    <>
      <SideBar className="h-screen visible sm:hidden"/>
      <div className="flex flex-col lg:ml-48">
        <Header headerName={headerName} className="fixed h-10"/>
        <div className="flex flex-row mt-4">
          <main className="flex-grow w-4/5">
            {children}
          </main>
          <RightSideBar className="fixed right-2 top-16 lg:w-1/3"/>
        </div>
      </div>
    </>
  );
};

export default Layout;
