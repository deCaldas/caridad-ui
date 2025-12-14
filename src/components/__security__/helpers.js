export const XSS_PAYLOADS = [
    `<img src=x onerror="window.__xss = true">`,
    `"><script>window.__xss = true</script>`,
    `" onmouseover="window.__xss = true`,
    `<svg/onload=window.__xss=true>`,
];

export function mount(html) {
    document.body.innerHTML = html;
    return document.body.firstElementChild;
}

export function xssTriggered() {
    return window.__xss === true;
}
