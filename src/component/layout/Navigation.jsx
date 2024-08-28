import { useState, useEffect } from 'react';
import Avatar from '../common/atom/Avatar';
import Dropdown from '../common/atom/Dropdown';
import Tooltip from '../common/atom/Tooltip';

const Navigation = (props) => {
    const { allMenuList, setHide, hide } = props;

    const [subMenu, setSubMenu] = useState([{label: '회원정보'}, { label: '로그아웃'}]);

    return (
        <>
            <div className="nav">
                <div className="nav-l">
                    <Tooltip content={hide ? 'open' : 'close'} direction="bottom">
                        <div id="menuBtn" onClick={() => setHide(!hide)}>
                            <i className={hide ? 'icon-menu_open' : 'icon-menu'}></i>
                        </div>
                    </Tooltip>
                    <div className="breadcrumb">
                        <p>Sematic 용어검색</p>
                        <p>
                            ISS Contents / <span> Semantic 용어검색 </span>
                        </p>
                    </div>
                </div>
                <div className="nav-r">
                    <Dropdown type="admin" onClick={() => {}} title='my page' content={subMenu}>
                        <div>
                            <Avatar text="길동" backgroundColor="#FF9800"/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default Navigation;
