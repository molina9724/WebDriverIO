describe("first E2E test suite", () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
  });

  it("should open wwww.epam.com", async () => {
    const expectedTitle =
      "EPAM | Software Engineering & Product Development Services";

    await browser.url("/");
    await expect(browser).toHaveTitle(expectedTitle);
  });

  it("should validate burger menu is open", async () => {
    await browser.url("/");
    await $(".hamburger-menu__button").click();
    await expect($(".hamburger-menu__dropdown")).toBeDisplayed();
  });

  it("should get redirected to Services when clicking it", async () => {
    await browser.url("/");
    const links = await $$(".top-navigation__item-link");
    await links[0].click();
    await expect(browser).toHaveTitle("Services | EPAM");
  });
});
