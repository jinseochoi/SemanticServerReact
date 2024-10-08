import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../contents/images/logo-iss.svg';

const menuList = [
    {label: 'ISS Contents', icon: '', link: '', children: [
        {label: '단어 검색', icon: 'input_search', link: '/linkname', 
            // children: [
            //     {label: '3depth', icon: '', link: '/'},
            //     {label: '3depth', icon: '', link: '/linkname'}
            // ]
        },
        {label: '단어 등록', icon: 'forms', link: '/linkname'},
        {label: 'Semantic 용어검색', icon: 'report_search', link: ''},
        {label: '용어등록(Semantic ID)', icon: 'report_medical', link: '/linkname'},
        {label: '도메인 검색', icon: 'world_code', link: '/linkname'},
        {label: '도메인 등록', icon: 'world_cog', link: '/linkname'},
        {label: 'ecl@ss&CDD list', icon: 'list_check', link: '/linkname'},
    ]},
    {label: '기준정보', icon: '', link: '', children: [
        {label: '기준코드 등록', icon: 'code_circle', link: '/linkname'},
        {label: '기준코드 검색', icon: 'zoom_code', link: '/linkname'},
        {label: '회원사 등록', icon: 'layout_grid_add', link: '/linkname'},
        {label: '회원사 목록', icon: 'list_details', link: '/linkname'},
        {label: '회사조직 구성', icon: 'hierarchy_3', link: '/linkname'},
        {label: 'AAS 참조모델 등록', icon: 'database_plus', link: '/linkname'},
        {label: 'AAS 참조모델 구조', icon: 'treeviewicon', link: '/linkname'},
        {label: '시스템 정보 관리', icon: 'device_desktop_cog', link: '/linkname'},
        {label: '시스템 구성 PGM 관리', icon: 'brightness_2', link: '/linkname'},
    ]},
    {label: '회원정보&시스템', icon: '', link: '', children: [
        {label: '사용자정보', icon: 'user_circle', link: '/linkname'},
        {label: '권한관리', icon: 'certificate', link: '/linkname'},
        {label: '적용업무관리', icon: 'file_settings', link: '/linkname'},
        {label: '접속로그', icon: 'file_code_2', link: '/linkname'},
        {label: '단어/용어 검색로그', icon: 'receipt', link: '/linkname'},
    ]},
    
];


const LeftSideBar = (props) => {
    const [openedMenu, setOpenedMenu] = useState();

    const secondLevelMenuClick = (e, menu) => {
        if (openedMenu === menu) {
            setOpenedMenu();
        } else {
            setOpenedMenu(menu);
        }
    }

    return (
        <div className="snb">
            <div>
                <div className="logo">
                    <img src={logo} />
                </div>
                <div className="menu">
                    {/* level1 */}
                    <ul className='level1'>
                        { menuList.map((dpt1, i) => 
                            <li key={`lvl1_${i}`}>
                                <div className='lvl1-name'>
                                    <p>{dpt1.label}</p>
                                </div>
                                
                                {/* level2 */}
                                <ul className='level2'>
                                    { dpt1.children?.map((dpt2, j) =>
                                        !dpt2.children ?
                                            <li key={`lvl2_${j}`}>
                                                <NavLink to={dpt2.link} className='lvl2-name'>
                                                    <div>
                                                        <i className={`icon-${dpt2.icon}`}></i>
                                                        <p>{dpt2.label}</p>
                                                    </div>
                                                    <i className="icon-chevron_right"></i>
                                                </NavLink>
                                            </li>
                                            : <li key={`lvl2_${j}`}>
                                                <div className='lvl2-name' onClick={(e) => secondLevelMenuClick(e, dpt2.label)}>
                                                    <div>
                                                        <i className={`icon-${dpt2.icon}`}></i>
                                                        <p>{dpt2.label}</p>
                                                    </div>
                                                    <i className={`icon-chevron_right ${openedMenu === dpt2.label ? "open" : "close"}`}></i>
                                                </div>

                                                {/* level3 */}
                                                <div className='level3-wrapper' style={{height: openedMenu === dpt2.label ? dpt2.children.length * 38 + 'px' : '0px'}}>
                                                    <ul className='level3'>
                                                        { dpt2.children?.map((dpt3, k) =>
                                                            <li key={`lvl3_${k}`}>
                                                                <NavLink to={dpt3.link} className='lvl3-name'>
                                                                    <div>
                                                                        <i className="icon-null"></i>
                                                                        <p>{dpt3.label}</p>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </li>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default LeftSideBar;