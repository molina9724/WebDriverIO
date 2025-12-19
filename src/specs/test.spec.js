describe("first E2E test suite", () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url("/");
  });

  it("should open wwww.epam.com", async () => {
    const expectedTitle =
      "EPAM | Software Engineering & Product Development Services";
    await expect(browser).toHaveTitle(expectedTitle);
  });

  it("should validate burger menu is open", async () => {
    await $(".hamburger-menu__button").click();
    await expect($(".hamburger-menu__dropdown")).toBeDisplayed();
  });

  it("should get redirected to Services when clicking it", async () => {
    const links = await $$(".top-navigation__item-link");
    await links[0].click();
    await expect(browser).toHaveTitle("Services | EPAM");
  });

  it("should redirect to Contact Page when clicking it", async () => {
    const contactUsButton = await $$(".cta-button__text");
    await contactUsButton[1].click();
    await expect(browser).toHaveTitle(
      "Learn more about EPAM and Contact Us | EPAM"
    );
  });

  it("should verify the form fields are displayed", async () => {
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

  it.only("should display validation errors when submitting empty required fields", async () => {
    const contactUsButton = await $$(".cta-button__text");
    await contactUsButton[1].click();
    await $(".button-ui").click();
    await expect($("input[name='user_first_name']")).toBeFocused();

    const formFields = await $$(".form-component__label");
    const expectedForm = [
      "First Name*",
      "Last Name*",
      "Email*",
      "Phone*",
      "How did you hear about EPAM?*",
    ];

    const allTexts = await formFields.map((element) => element.getText());
    const requiredFields = [...formFields].filter((element, index) =>
      expectedForm.includes(allTexts[index])
    );
    await requiredFields.forEach((element) => element.click());
    const validationField = await $$(".validation-field");
    expect(validationField.length).toEqual(6);
    for (const element of requiredFields) {
      await expect(element).toBeDisplayed();
      const color = await element.getCSSProperty("color");
      expect(color.parsed.hex).toEqual("#ff4d40");
      const border = await element.getCSSProperty("border-bottom-color");
      expect(border.parsed.hex).toEqual("#ff4d40");
    }
  });
});
