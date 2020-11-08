/**
 * Sets a new cookie on the domain
 * 
 * @param cname - cookie name
 * @param cvalue - cookie value
 * @param exdays - expiration in days
 */

export const setCookie = (cname: string, cvalue: boolean, exdays: number) => {
    const d = new Date();
    let expires;

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * Get specific cookie
 * 
 * @param cname cookie name
 */

export const getCookie = (cname: string) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}