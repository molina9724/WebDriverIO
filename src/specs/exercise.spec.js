/**
 * WebDriverIO Exercise - EPAM.com
 *
 * Your Task:
 * Complete the tests below using these methods:
 * - toBeDisplayed
 * - toExist, toBePresent, toBeExisting
 * - toBeFocused
 * - toHaveAttribute, toHaveAttr, toHaveAttributeContaining
 * - toHaveText, toHaveTextContaining
 *
 * Run: npx wdio run wdio.conf.js --spec src/specs/exercise.spec.js
 */

describe("WebDriverIO Matchers Exercise - EPAM.com", () => {
  before(async () => {
    await browser.maximizeWindow();
    await browser.url("/");
    await $("#onetrust-accept-btn-handler").click();
  });

  it("should handle Visibility and Existence assertions", async () => {
    // 1. Assert that the EPAM logo is displayed
    await expect($(".header__logo-dark")).toBeDisplayed();
    await expect($(".header__logo-light")).toBeDisplayed();

    // 2. Assert that the main navigation exists in the DOM
    await expect($("#wrapper")).toExist();

    // 3. Assert that a non-existing element does NOT exist
    await expect($(".fakeselector")).not.toExist();
  });

  it("should handle Focus assertions", async () => {
    // 1. Open the search functionality
    await $(".header-search__button").click();
    // 2. Click on the search input field
    await $(".search-results__input-holder").click();
    // 3. Assert that the search input is focused
    await expect($("#new_form_search")).toBeFocused();
  });

  it("should handle Attribute assertions", async () => {
    // 1. Find a link on the page
    const fatLinks = await $$(".fat-links");
    // 2. Assert that the link has an 'href' attribute
    await expect(fatLinks[0]).toHaveAttribute("href");
    // 3. Assert that a link's 'href' contains a specific partial value
    const link = await fatLinks[0].getAttribute("href");
    expect(link).toContain("epam-continuum");
  });

  it("should handle Text assertions", async () => {
    // 1. Find a text element on the page
    const text = await $$(".font-size-80-33");
    // 2. Assert the element has an exact text
    expect(await text[0].getText()).toEqual("We can help you");
    // 3. Assert an element contains partial text
    expect(await text[0].getText()).toContain("can help");
  });
});
