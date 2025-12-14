import { mount } from "./helpers";
import "../select/c-select.js";

describe("Seguridad – Uso seguro del DOM", () => {
    test("El contenido visible usa textContent", () => {
        const el = mount(`<c-select placeholder="<b>XSS</b>"></c-select>`);
        const label = el.shadowRoot.querySelector(".selected-label");

        expect(label.textContent).toBe("&lt;b&gt;XSS&lt;/b&gt;");
    });
});

