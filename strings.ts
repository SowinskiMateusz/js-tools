/**
 * Search and replace all links in content and return changed content
 * @param content 
 */
import { toValidLink } from './links';

export const linkify = (content: string) => {
    const regEx = /(?:((\b(https?|ftp|file):\/\/)[\S]+(\b|$))|(^|[^\/])(www\.[\S]+(\b|$)))/igm;
    const urls = content.match(regEx);
    if (urls) {
        urls.forEach((url) => {
            content = content.replace(url, `<a target="_blank" href="${toValidLink(url.trim())}">${url}</a>`);
        });
    }
    return content;
}