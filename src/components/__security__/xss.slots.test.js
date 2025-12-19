import { mount, xssTriggered } from "./helpers";

describe("XSS – Inyección vía slots", () => {
  beforeEach(() => {
    window.__xss = false;
    document.body.innerHTML = "";
  });

  test("Los slots no ejecutan scripts", () => {
    mount(`
      <c-card>
        <img src="x" onerror="window.__xss = true">
      </c-card>
    `);

    expect(xssTriggered()).toBe(false);

  });
});
