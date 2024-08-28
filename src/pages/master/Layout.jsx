import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Outlet } from "react-router-dom";
import ResizablePanel from "../../component/layout/ResizablePanel";
import LeftSideBar from "../../component/layout/LeftSideBar";
import Navigation from "../../component/layout/Navigation";

export default function Layout() {
    const [leftSideBarHide, setLeftSideBarHide] = useState(false);


    return (
        <ResizablePanel leftContent={<LeftSideBar />} rightContent={<Outlet />} topContent={<Navigation hide={leftSideBarHide} setHide={setLeftSideBarHide} />} hide={leftSideBarHide} />
    );
}