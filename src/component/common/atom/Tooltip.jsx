import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

/**
 *
 * @property {string} content content of tooltip
 * @property {string} direction
 * @property {boolean} hidden
 * @returns <Tooltip content="tooltip" direction="bottom" hidden={false} />
 */
const Tooltip = ({ content, children, direction, hidden = false, maxWidth }) => {
    const [isVisible, setVisible] = useState(false);
    // const tooltipElement = document.createElement("p");
    const root = document.getElementById("portal-root");
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const targetRef = useRef(null);

    const handleEnter = (event) => {
        setVisible(true);
        const { top, left, width, height } = targetRef.current.getBoundingClientRect();

        if (direction === "bottom") {
            setPosition({
                top: top + height + 13, 
                left: left + width/2
            })
        } else if (direction === "bottom-left") {
            setPosition({
                top: top + height + 13, 
                left: left + width/2 - 16
            });
        } else if (direction === "bottom-right") {
            setPosition({
                top: top + height + 13, 
                left: left + width/2 + 16
            });
        } else if (direction === "top") {
            setPosition({
                top: top - 13, 
                left: left + width/2 
            })
        } else if (direction === "top-left") {
            setPosition({
                top: top - 13, 
                left: left + width/2 - 16
            });
        } else if (direction === "top-right") {
            setPosition({
                top: top - 13, 
                left: left + width/2 + 16
            });
        } else if (direction === "left") {
            setPosition({
                top: top + height/2,
                left: left - 13 
            })
        } else if (direction === "left-top") {
            setPosition({
                top: top + height/2 - 16,
                left: left - 13
            })
        } else if (direction === "left-bottom") {
            setPosition({
                top: top + height/2 + 16,
                left: left - 13
            })
        } else if (direction === "right") {
            setPosition({
                top: top + height/2, 
                left: left + width + 13
            })
        } else if (direction === "right-top") {
            setPosition({
                top: top + height/2 - 16,
                left: left + width + 13
            })
        } else if (direction === "right-bottom") {
            setPosition({
                top: top + height/2 + 16,
                left: left + width + 13
            })
        } else {
            setPosition({
                top: top + height + 4, 
                left: left + width/2
            })
        }
    };

    const handleLeave = () => {
        setVisible(false);
    };

    // children을 div로 감싸는 함수 컴포넌트를 생성
    const wrapChildrenWithDiv = () => {
        return (
            <div 
                onMouseEnter={handleEnter} 
                onMouseLeave={handleLeave} 
                ref={targetRef} 
                className='tooltip-wrapper'
            >
                {children}
            </div>
        );
    };

    // cloneElement를 사용하여 children을 감싸는 함수 컴포넌트를 렌더링
    const wrappedChildren = React.cloneElement(wrapChildrenWithDiv(), {});

    return (
        <>
            {/* {React.cloneElement(children, {
            ref: targetRef,
            onMouseEnter: handleEnter,
            onMouseLeave: handleLeave,

        })} */}
            {wrappedChildren}
            {isVisible && content &&
                ReactDOM.createPortal(
                    <div
                        style={{ top: position.top, left: position.left, display: hidden ? 'none' : '' }}
                        className={`tooltip ${direction ? direction : 'none'}`}
                    >
                        <div className='content'>
                            <p className={`text ${maxWidth? 'max-w' : ''}`} style={{maxWidth: maxWidth}}>
                                {content?.split("\n").map((word, index) => (
                                    // <> {word} {index !== content.length && <br/>} </>
                                    <React.Fragment key={index}>
                                        {" "}
                                        {word} {index !== content.length && <br />}{" "}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>,
                    root,
                )}
        </>
    );
};

export default Tooltip;
