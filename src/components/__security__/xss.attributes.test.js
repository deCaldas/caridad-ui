import { XSS_PAYLOADS, mount, xssTriggered } from "./helpers";

const COMPONENTS = [
    { tag: "c-button", attr: "variant" },
    { tag: "c-button", attr: "size" },
    { tag: "c-button", attr: "disabled" },
    { tag: "c-button", attr: "icon-left" },
    { tag: "c-button", attr: "icon-right" }
];

describe("XSS – Inyección por atributos", () => {
    beforeEach(() => {
        window.__xss = false;
        document.body.innerHTML = "";
    });

    COMPONENTS.forEach(({ tag, attr }) => {
        test(`${tag} bloquea XSS en atributo "${attr}"`, async () => {
            XSS_PAYLOADS.forEach(payload => {
                const el = mount(`<${tag} ${attr}='${payload}'></${tag}>`);

                expect(xssTriggered()).toBe(false);
                if (el.shadowRoot) {
                    expect(el.shadowRoot.innerHTML)
                        .not.toMatch(/onerror|onload|script/i);
                }
            });
        });
    });
});
