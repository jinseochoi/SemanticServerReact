import LocalizedStrings from 'react-localization';
import localization from '../../localization/index';
import { getLanguage } from '../../api/Common';

export default function useTranslation() {
    const lang = getLanguage();
    let translation = new LocalizedStrings(localization);

    translation.setLanguage(lang);
    return translation;
}
