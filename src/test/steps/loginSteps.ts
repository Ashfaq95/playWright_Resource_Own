import{ Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import{expect} from "@playwright/test"
import{fixture} from "../../hooks/pageFixture";


setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {

    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to to the application")

  });
  
    Given('User click on the login link', async function () {
        await fixture.page.locator("//span[contains(text(),'Login')]").click();
    });
  
    Given('User enter the username as {string}', async function (username) {
        await fixture.page.locator("//input[@formcontrolname='username']").fill(username);

    });
  
    Given('User enter the password as {string}', async function (password) {
        await fixture.page.locator("//input[@formcontrolname='password']").fill(password);

    });
  
    When('User click on the login button', async function () {

        await fixture.page.locator("(//button[contains(.,'Login')])[2]").click();
         await fixture.page.waitForLoadState();
        fixture.logger.info("Waiting for 2 secoends")
        await fixture.page.waitForTimeout(2000);

    });
  
    Then('Login should be success', async function () {

       const text = await fixture.page.locator("//span[contains(text(),'testAshfaq')]").textContent();
        console.log("Username:" + text);
        fixture.logger.info("Username : " +text);

    });