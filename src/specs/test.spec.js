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

  it("should redirect to Contact Page when clicking it", async () => {
    await browser.url("/");
    const contactUsButton = await $$(".cta-button__text");
    await contactUsButton[1].click();
    await expect(browser).toHaveTitle(
      "Learn more about EPAM and Contact Us | EPAM"
    );
  });

  it("should verify the form fields are displayed", async () => {
    await browser.url("/");
    const contactUsButton = await $$(".cta-button__text");
    await contactUsButton[1].click();
    const formFields = await $$(".form-component__label");
    const formTexts = await formFields.map(async (element) => {
      return await element.getText();
    });
    const cleanedForm = formTexts.filter((word) => word !== "");
    const expectedForm = [
      "Select the Reason for Your Inquiry*",
      "First Name*",
      "Last Name*",
      "Email*",
      "Phone*",
      "Company",
      "Position",
      "Location*",
      "Your inquiry or comments",
      "How did you hear about EPAM?*",
    ];
    await expect(cleanedForm).toEqual(
      expectedForm,
      "Form fields do not match the expected values."
    );
  });
});
