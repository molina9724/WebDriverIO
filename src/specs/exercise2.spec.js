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
  before(async () => {
    await browser.maximizeWindow();
    await browser.url("/");
    await $("#onetrust-accept-btn-handler").click();
  });

  it("should practice setValue and addValue", async () => {
    // 1. Open the search
    // 2. Use setValue() to type "automation" in the search input
    // 3. Use addValue() to append " testing" to the existing text
    // 4. Get the input value and verify it equals "automation testing"
  });

  it("should practice isDisplayed and isExisting", async () => {
    // 1. Check if the EPAM logo isDisplayed() - store result in a variable
    // 2. Check if '#wrapper' isExisting() - store result in a variable
    // 3. Check if a fake element '.does-not-exist' isExisting()
    // 4. Use console.log or expect to verify the boolean values
  });

  it("should practice waitForDisplayed", async () => {
    // 1. Click the search button to open search panel
    // 2. Use waitForDisplayed() on the search input before interacting
    // 3. Type something in the search field
  });

  it("should practice waitForExist", async () => {
    // 1. Navigate to a page or trigger an action that loads new content
    // 2. Use waitForExist() to wait for a specific element to appear in DOM
    // 3. Once it exists, check if it's also displayed
  });
});
