const {By, until} = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

class BasePage
{
    constructor(driver)
    {
        this.driver = driver
    }

    async goToAnytimeMailbox()
    {
        await this.driver.get("https://www.anytimemailbox.com/")
    }

    async clickSearch(searchKey)
    {
        const searchElement = await this.driver.findElement(By.id("lookup"));
        await this.driver.wait(until.elementIsVisible(searchElement), 10000);
        await searchElement.click();
        await searchElement.sendKeys(searchKey);
        await this.wait(3000);
    }

    async selectSearchOption()
    {
        await this.driver.wait(
            until.elementIsVisible(
                this.driver.findElement(By.xpath('//ul[@role="listbox"]//li[1]'))), 10000);

        const selectLocationOption = await this.driver.findElement(By.xpath('//ul[@role="listbox"]//li[1]'));
        await selectLocationOption.click();
    }

    async clickSearchBtn()
    {
        await this.driver.findElement(By.xpath('//button[@type="submit"]')).click();
    }

    async clickLoginBtnNavBar()
    {
        await this.driver.findElement(By.xpath("(//a[text()='LOG IN'])[2]")).click();
    }

    async clickUsernameField(username)
    {
        await this.driver.findElement(By.id('f_uid')).sendKeys(username);
    }

    async clickPasswordField(pass)
    {
        await this.driver.findElement(By.id("f_pwd")).sendKeys(pass)
    }

    async clickCaptchaCheckBox()
    {
        const iframe = await this.driver.wait(until.elementLocated(By.css('iframe[title="reCAPTCHA"]')), 10000);
        await this.driver.switchTo().frame(iframe);

        await this.driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'borderAnimation')]")), 10000)

        await this.driver.findElement(By.xpath("//span[contains(@class, 'recaptcha-checkbox')]")).click();
        await this.wait(3000);
        await this.driver.switchTo().defaultContent();
    }
    
    async clickLoginBtnLoginPage()
    {
        await this.driver.findElement(By.xpath(`//button[@onclick="$('#main-form').mtekSubmitForm('UPD');"]`)).click();
    }

    async takeScreenshot(driver, filename)
    {
        const image = await driver.takeScreenshot();
        const filePath = path.join('./test-screenshot', filename);
        fs.writeFileSync(filePath, image, 'base64');
    }

    async wait(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
}

exports.BasePage = BasePage;