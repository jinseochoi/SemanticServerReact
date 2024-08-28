// import { BASE_URL } from "../../../config";
import noImg from '../../../contents/images/icon-photo_cancel.svg';

/**
 *
 * @param {*} props
 * @property {false||string} src image source
 * @property {false||string} text 2 letters that is used when avatar don't have src
 * @example <Avatar src="Attachments//UserMaster//315//Rectangle 61703558949201.png" text={false} backgroundColor="#F000B9" />
 * @example <Avatar src={false} text={"JD"} backgroundColor="#F000B9" />
 */
const Avatar = (props) => {
    const {
        src,
        text,
        width = 36,
        // baseAPI = `${BASE_URL}static_files/`,
        backgroundColor,
        count,
    } = props;

    const handleImg = (e) => {
        e.currentTarget.src = noImg;
        e.target.classList.add('error');
    };

    return (
        <div className="avatar" style={{ width: width, height: width }}>
            {src && <img /*src={`${baseAPI}${src}`}*/ alt="avatar" onError={handleImg} />}
            {!src && (text || count) && 
                <p style={{ backgroundColor: backgroundColor, fontSize: width > 45 ? width / 3 : 15 }}>
                    {text ? avatarStr(text) : count + '+'}
                </p>
            }
        </div>
    );
};

export default Avatar;

/**
 * @function
 * @description
 * @param {String}
 * @example
 * avatarStr('gildong')
 * > G
 * avatarStr('길동')
 * > 길동
 */
export const avatarStr = (str) => {
    // check en
    let regex = /[a-zA-Z]/;

    // return regex.test(str) ? str?.substr(0, 1)?.toUpperCase() : str?.substr(0, 2);
    return str?.substr(0, 2)?.toUpperCase();
};

// background color
export const tempColor = ['#0EA5E9', '#FF9800', '#F000B9', '#805DCA', '#FF5724', '#10B981'];

export const avatarText = (user) => {
    let checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    let userInfo;
    if (user.is_department) {
        userInfo = { type: 'dept', text: user.first_name != null ? user.first_name : '' };
    } else {
        if (user?.image_path) {
            userInfo = { type: 'img', text: user?.image_path };
        } else {
            if (user.first_name != null) {
                if (checkKo.test(user.first_name)) {
                    // name : ko
                    userInfo = { type: 'user', text: user.first_name };
                } else {
                    // name : en
                    userInfo = { type: 'user', text: `${user.last_name?.[0]}${user.first_name?.[0]}` };
                }
            } else {
                // name not exists => email
                userInfo = { type: 'user', text: user.user_master_email };
            }
        }
    }

    return { ...userInfo, backgroundColor: tempColor[user.user_master_id % 6] };
};

export function Image(props) {
    const { src, size } = props;

    const loadImg = (e) => {
        e.currentTarget.classList.remove('error');
    };

    const handleImg = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.classList.add('error');
        // e.currentTarget.src = noImg;
    };

    return <div className={`image ${size ? size : ''}`}>{src && <img src={src} alt="" onError={handleImg} onLoad={loadImg} />}</div>;
}
