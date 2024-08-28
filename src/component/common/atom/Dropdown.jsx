import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const tempColor = ['#0EA5E9', '#FF9800', '#F000B9', '#805DCA', '#FF5724', '#10B981'];

/**
 * @property {object[]} content [{label, name, isCurValue}]
 * @property {element} children
 * @property {function} onDropdownClick Function called when one of the content is clicked
 * @property {function} onClick Function called when click event is occured at dropdown to open list
 * @property {string} title
 * @property {string||[]} type type of dropdown [selectbox]|admin|apps
 * @property {boolean} visible
 * @returns
 */
const Dropdown = ({ content, children, onDropdownClick = () => {}, onClick = () => {}, title, type, isAlignLeft = false, isFullWidth = false, visible = false, getHideTooltip }) => {

    const targetRef = useRef(null);
    const backgroundColorRef = useRef();
    const avatarText = useRef();

    const [isVisible, setVisible] = useState(false);
    const root = document.querySelector('body');
    const [position, setPosition] = useState({});
    const [fullWidth, setFullWidth] = useState();
    const [userInfo, setUserInfo] = useState();

    //click selectbox or dropdown btn
    const handleClick = () => {
        if (isVisible) {
            targetRef.current.classList.remove('focus');
        } else {
            targetRef.current.classList.add('focus');
        }

        //dropdown position
        const { top, left, width, height } = targetRef.current.getBoundingClientRect();
        const body = document.querySelector('body').getBoundingClientRect();

        let isReverse = body.height - top - height - content.length * 45 < 0;

        if (isAlignLeft) {
            setPosition({ top: top + (!isReverse ? height + 8 : -8), left: left, transform: `${!isReverse ? 'unset' : 'translateY(-100%)'}`, width: width });
        } else {
            setPosition({ top: top + (!isReverse ? height + 8 : -8), left: left + width, transform: `${!isReverse ? 'translateX(-100%)' : 'translate(-100%, -100%)'}`, width: width });
        }

        //get selecbox width (set dropdown width)
        if (isFullWidth) {
            setFullWidth(width);
        }

        //dropdown visible
        if (type.includes('profileupload')) {
            if (visible) setVisible(!isVisible);
            else onClick();
        } else {
            setVisible(!isVisible);
            onClick();
        }
    };

    // click option
    const dropdownClick = (e, c) => {
        setVisible(false);
        targetRef.current.classList.remove('focus');

        if (c.label === e.currentTarget.innerText) {
            onDropdownClick(e, c);
        }
    };

    //click outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (targetRef.current && !targetRef.current.contains(event.target)) {
                setVisible(false);
                targetRef.current.classList.remove('focus');
            }
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {React.cloneElement(children, { ref: targetRef, onClick: handleClick })}
            {isVisible &&
                ReactDOM.createPortal(
                    <div
                        style={{
                            top: position.top,
                            left: position.left,
                            transform: position.transform,
                            width: isFullWidth ? fullWidth : type === 'apps' ? '320px' : 'fit-content',
                            maxWidth: isFullWidth ? fullWidth : '320px',
                            minWidth: isFullWidth ? fullWidth : '230px',
                        }}
                        className="dropdown"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <ul>
                            {content?.map((c, index) => (
                                <li
                                    key={index}
                                    onClick={(e) => dropdownClick(e, c)}
                                    // {...(c?.fn && c?.fn)}
                                >
                                    <p>{c.label}</p>
                                </li>
                            ))}
                        </ul> */}

                        {/* dropdown title */}
                        {title && type !== 'admin' && (
                            <div className="title">
                                <p>{title}</p>
                            </div>
                        )}

                        {/* admin title */}
                        {type === 'admin' && (
                            <div className="admin-title">
                                <Avatar width={38} backgroundColor="#FF9800" text="길동" />
                                <div className="account">
                                    <p>로그인정보</p>
                                    <p>james@site.com</p>
                                </div>
                            </div>
                        )}

                        {/* list */}
                        {type !== 'apps' && (
                            <div className="options">
                                <ul className="dropdown-scrollbar">
                                    {content?.map((c, index) => (
                                        <li
                                            key={index}
                                            id={c?.value}
                                            className={`${c.isCurValue ? 'current-val' : ''} ${c?.disabled ? 'disabled' : ''}`}
                                            style={{ justifyContent: fullWidth < 80 ? 'center' : '' }}
                                            // {...(c?.fn && c?.fn)}
                                        >
                                            <div className="name" onClick={(e) => dropdownClick(e, c)}>
                                                {type.includes('selectbox') && (
                                                    <>
                                                        {c.icon && <i className={`icon-${c.icon}`}></i>}
                                                        <p>{c.label}</p>
                                                    </>
                                                )}

                                                {type === 'admin' && (
                                                    <>
                                                        <p className="menuName">{c.label}</p>
                                                        <i className="icon-chevron_right"></i>
                                                    </>
                                                )}

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>,
                    root
                )}
        </>
    );
};

export default Dropdown;
