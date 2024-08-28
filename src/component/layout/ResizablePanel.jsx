import React, { useRef } from "react";
import "../../contents/styles/icomoon.css";
import "../../contents/styles/css/layout.css";
import "../../contents/styles/css/component.css";

function ResizablePanel(props) {
    const { leftContent, rightContent, topContent, hide } = props;
    const sidebarRef = useRef(null);

    return (
        <div className={`layout ${hide ? "hide" : ""}`}>
            {/* left */}
            <div ref={sidebarRef} onMouseDown={(e) => e.preventDefault()} className="snb">
                {leftContent}
            </div>

            {/* right */}
            <div className="main">
                {/* header */}
                {topContent}

                {/* content */}
                <div className="page">
                    {rightContent}
                </div>
            </div>
        </div>
    );
}

export default ResizablePanel;