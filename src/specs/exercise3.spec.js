/**
 * WebDriverIO Exercise 3 - Advanced Commands
 *
 * Methods to practice:
 * - doubleClick(), dragAndDrop(), moveTo()
 * - execute(), executeAsync()
 * - waitUntil()
 * - setCookies(), getCookies(), deleteCookies()
 * - getAttribute(), getProperty()
 *
 * Run: npx wdio run wdio.conf.js --spec src/specs/exercise3.spec.js
 */

describe("WebDriverIO Exercise 3 - Advanced Commands", () => {
  describe("Mouse Actions - the-internet.herokuapp.com", () => {
    before(async () => {
      await browser.url("https://the-internet.herokuapp.com");
    });

    it("should trigger hover state on an element", async () => {
      // Navigate to /hovers and reveal hidden user info via moveTo().
      await $("a[href='/hovers']").click();
      const figures = await $$(".figure");

      for (let index = 0; index < figures.length; index++) {
        await figures[index].moveTo();
        expect(await figures[index].$(".figcaption")).toBeDisplayed();
      }
    });

    it("should perform a double-click action", async () => {
      // Navigate to /add_remove_elements and use doubleClick() creatively.
      await $("a[href='/add_remove_elements/']").click();
      await $("button[onclick='addElement()']").doubleClick();
      expect(await $$(".added-manually")).toBeDisplayed();
      const cont = await $$(".added-manually");
      expect(cont.length).toEqual(2);
    });

    it("should drag an element to a target", async () => {
      // Navigate to /drag_and_drop and move column A to column B.
      await $("a[href='/drag_and_drop']").click();
      const columnA = await $("#column-a");
      const columnB = await $("#column-b");

      const columnAText = await columnA.getText();
      const columnBText = await columnB.getText();

      await columnA.dragAndDrop(columnB);

      const columnAText2 = await columnA.getText();
      const columnBText2 = await columnB.getText();

      expect(columnAText).toEqual(columnBText2);
      expect(columnBText).toEqual(columnAText2);
    });
  });

  describe("JavaScript Execution - EPAM.com", () => {
    before(async () => {
      await browser.url("https://www.epam.com");
    });

    it("should execute synchronous JavaScript", async () => {
      // Use execute() to scroll to the footer or retrieve a computed style.
    });

    it("should execute asynchronous JavaScript", async () => {
      // Use executeAsync() with a callback to simulate a delayed operation.
    });
  });

  describe("Custom Waits - EPAM.com", () => {
    it("should wait for a custom condition", async () => {
      // Use waitUntil() to poll for a specific DOM state or network idle.
    });
  });

  describe("Cookie Management", () => {
    it("should set, retrieve, and delete cookies", async () => {
      // Use setCookies() to create a test cookie.
      // Use getCookies() to verify it exists.
      // Use deleteCookies() to remove it and confirm deletion.
    });
  });

  describe("Element Properties", () => {
    it("should retrieve element attributes and properties", async () => {
      // Use getAttribute() to get an element's 'href' or 'class'.
      // Use getProperty() to get a live DOM property like 'checked' or 'value'.
    });
  });
});
