const {Builder} = require('selenium-webdriver');
const { BasePage } = require('../page/Basepage');
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('start-maximized');

describe("Search a Valid Location", () => {

    let driver;
    let basePage;

    beforeEach(async() => {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
        basePage = new BasePage(driver);
        await basePage.goToAnytimeMailbox();
    })

    afterEach(async() => {
        await driver.quit();
    })

    it("TC001 - Search a valid location", async() => {
        await basePage.clickSearch("Manila, Philippines");
        await basePage.selectSearchOption();
        await basePage.wait(5000);
        await basePage.takeScreenshot(driver, 'valid-location.png');
    })

    it("TC002 - Search for a invalid location", async() => {
        await basePage.clickSearch(",.,.,.");
        await basePage.clickSearchBtn();
        await basePage.wait(5000);
        await basePage.takeScreenshot(driver, 'invalid-location.png');
    })

    it("TC0003 - Login with invalid user credentials", async() => {
        await basePage.clickLoginBtnNavBar();
        await basePage.clickUsernameField("123test@gmail.com");
        await basePage.clickPasswordField("example");
        await basePage.clickCaptchaCheckBox();
        await basePage.clickLoginBtnLoginPage();
        await basePage.wait(3000);
        await basePage.takeScreenshot(driver, 'invalid-login.png');
    })
})