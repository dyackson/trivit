import sanitizeHtml from 'sanitize-html';

export function collapse_whitespace(string) {
    return string.replace(/\s+/g, ' ').trim();
}

export function standout_html(string) {
    const sanitized = sanitizeHtml(string);
    return `<span class='has-text-weight-bold is-italic'>${sanitized}</span>`
}
