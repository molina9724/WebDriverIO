describe("first E2E test suite", () => {
  it("should open wwww.epam.com", async () => {
    const expectedTitle =
      "EPAM | Software Engineering & Product Development Services";

    await browser.url("/");
    await expect(browser).toHaveTitle(expectedTitle);
  });
});
