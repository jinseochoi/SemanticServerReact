import React, { useEffect, useState } from 'react';
import useTranslation from '../../customHooks/translations';
import Dropdown from './Dropdown';
import Tooltip from './Tooltip';

/**
 * @property {false||string} text Text to be displayed on
 * @property {string} icon Icon to be displated on
 * @property {boolean} disabled
 * @property {function} clickFn Function that runs when button is clicked
 * @example <Button icon="trash" clickFn={(e) => deleteFn()} disabled={false} />
 */
const Button = (props) => {
    const { /* type = 'button', */ text, icon, disabled, clickFn, size, mode, isFullWidth = false } = props;

    return (
        <button
            // type={type}
            className={`btn ${mode} ${size} ${isFullWidth ? 'full' : ''}`}
            disabled={disabled}
            onClick={clickFn}
        >
            {icon && icon !== 'chevron_right' && <i className={`icon-${icon}`}></i>}
            {text && <p>{text}</p>}
            {icon && icon === 'chevron_right' && <i className="icon-chevron_right"></i>}
        </button>
    );
};

export default Button;

/**
 * @property {string} icon Icon to be displated on
 * @property {function} clickFn Function that runs when button is clicked
 * @property {boolean} disabled
 * @property {string} tooltip
 * @example <StrokeBtn icon="x" clickFn={cancel} disabled={false} tooltip={`${translation.search} ${translation.close}`} />
 */
export function StrokeBtn(props) {
    const { icon, clickFn = () => {}, disabled = false, tooltip } = props;
    const translation = useTranslation();

    return (
        <Tooltip content={tooltip ? tooltip : icon === 'trash' ? translation.delete2 : icon === 'plus' ? translation.add2 : icon === 'search' ? translation.search : icon === 'setting' ? translation.setting : ''} direction="bottom">
            <button className="btn-stroke" onClick={(e) => [e.preventDefault(), clickFn()]} disabled={disabled}>
                <i className={`icon-${icon}`}></i>
            </button>
        </Tooltip>
    );
}

export function DropdownBtn(props) {
    const { icon, type, title, content, onClick = () => {}, onDropdownClick = () => {}, disabled = false, tooltip, tooltipDir = 'bottom' } = props;

    const [hideTooltip, setHideTooltip] = useState(false);

    const getHideTooltipProp = (state) => {
        setHideTooltip(state);
    };

    return (
        <Dropdown type={type} title={title} content={content} onDropdownClick={onDropdownClick} onClick={onClick} getHideTooltip={getHideTooltipProp}>
            <button className="btn-dropdown" disabled={disabled}>
                <Tooltip content={tooltip ? tooltip : title} direction={tooltipDir} hidden={hideTooltip}>
                    <i className={`icon-${icon ? icon : type}`}></i>
                </Tooltip>
            </button>
        </Dropdown>
    );
}

export function RoundBgBtn(props) {
    const { icon, tooltip, clickFn = () => {}, disabled } = props;

    return (
        <button className="btn-round_bg" onClick={(e) => [e.preventDefault(), clickFn()]} disabled={disabled}>
            <Tooltip content={tooltip} direction="bottom">
                <i className={`icon-${icon}`}></i>
            </Tooltip>
        </button>
    );
}

// import React, { useEffect, useState } from 'react';
// import useTranslation from '../../customHooks/translations';

// /**
//  * @property {false||string} text Text to be displayed on
//  * @property {string} icon Icon to be displated on
//  * @property {boolean} disabled
//  * @property {function} clickFn Function that runs when button is clicked
//  * @example <Button icon="trash" clickFn={(e) => deleteFn()} disabled={false} />
//  */
// const Button = (props) => {
//     const { text, icon, disabled, clickFn, size = 'md', isFullWidth = false, color } = props;

//     return (
//         <>
//             <button disabled={disabled} onClick={clickFn} className={`btn ${size} ${isFullWidth && 'full'} ${color}`}>
//                 {icon && <i className={`icon-${icon}`}></i>}
//                 {text && <p>{text}</p>}
//             </button>
//         </>
//     );
// };

// export default Button;

// /**
//  * @property {string} icon Icon to be displated on
//  * @property {function} clickFn Function that runs when button is clicked
//  * @property {boolean} disabled
//  * @property {string} tooltip
//  * @example <StrokeBtn icon="x" clickFn={cancel} disabled={false} tooltip={`${translation.search} ${translation.close}`} />
//  */
// export function StrokeBtn(props) {
//     const { icon, clickFn = () => {}, disabled = false, tooltip } = props;
//     const translation = useTranslation();

//     return (
//         // <Tooltip content={tooltip ? tooltip : icon === 'trash' ? translation.delete2 : icon === 'plus' ? translation.add2 : icon === 'search' ? translation.search : icon === 'setting' ? translation.setting : ''} direction="bottom">
//         <button className="btn-stroke" onClick={(e) => [e.preventDefault(), clickFn()]} disabled={disabled}>
//             <i className={`icon-${icon}`}></i>
//         </button>
//         // </Tooltip>
//     );
// }
