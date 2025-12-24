/**
 * WebDriverIO Exercise 2 - Forms & Waits
 *
 * Methods to practice:
 * - setValue()
 * - addValue()
 * - isDisplayed()
 * - isExisting()
 * - waitForDisplayed()
 * - waitForExist()
 *
 * Run: npx wdio run wdio.conf.js --spec src/specs/exercise2.spec.js
 */

describe("WebDriverIO Exercise 2 - EPAM.com", () => {
  before(async () => {});

  it("should allow searching for queries", async () => {
    // Implement search workflow: open search, type 'automation', append ' testing', and verify the canonical value.
    await $(".header-search__button").click();
    await $("#new_form_search").setValue("automation");
    await $("#new_form_search").addValue(" testing");
    const text = await $("#new_form_search").getValue();
    expect(text).toEqual("automation testing");
  });

  it("should verify element visibility and existence", async () => {
    // validate the display state of the logo and presence of it.
    const logo = $(".header__logo-light");
    expect(logo).toBeExisting();
    expect(logo).toBeDisplayed();
  });

  it("should wait for search input to be displayed", async () => {
    // Ensure the search input is visible before attempting interaction.
    await $(".header-search__button").click();
    await $("#new_form_search").waitForDisplayed();
    expect(await $("#new_form_search")).toBeDisplayed;
  });

  it("should wait for steady state elements", async () => {
    // Wait for the footer to be present in the DOM before asserting its state.
    expect(await $("footer").waitForExist());
  });
});
