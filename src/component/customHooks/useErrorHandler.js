import useTranslation from './translations';
import { swal, useSwal } from '../common/Swal';
import { commonToastr } from '../common/Toastr';

//execute API function with parameters and handle errors
export default function useErrorHandler() {
    const translation = useTranslation();
    const { fail } = useSwal();

    const errorHandler = async (func, ...param) => {
        //(func: api function to execute, param: parameters for func)
        try {
            const res = await func(...param);
            if (res !== 'fail' && res.message === 'MSG_100') {
                return res;
            } else if (res !== 'fail') {
                // fail(`<p>${translation[res.message]}</p>`);
                commonToastr('error', `<div>${translation[res.message]}</div>`);
                // console.log(`func name: ${func.name}, param: ${JSON.stringify(param)}, res: ${JSON.stringify(res)}`, 'error');
            } else if (res === 'fail') {
                // fail(`<p>${translation.MSG_103}</p>`);
                console.log(translation.MSG_103);
            }
            return null;
        } catch (e) {
            console.log(e.message);
            console.log(`func name: ${func.name}, param: ${param}`, 'error');
            return null;
        }
    };

    return errorHandler;
}

export async function simpleErrorHandler(func, ...param) {
    try {
        const res = await func(...param);
        if (res !== 'fail' && res.message === 'MSG_100') {
            return res;
        } else {
            console.log(`Fail: ${res.message}`);
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}
