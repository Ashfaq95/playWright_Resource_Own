
import{ Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber"
import{expect} from "@playwright/test"
import{fixture} from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

When('user search for a {string}', async function (book) {
  fixture.logger.info("Searching for a book: "+ book);
    await fixture.page.locator("//input[@placeholder='Search books or authors']").fill(book);
    await fixture.page.waitForTimeout(3000);
    await fixture.page.locator("//body[1]/div[3]/div[1]/div[1]/div[1]/mat-option[1]").click();
    await fixture.page.waitForTimeout(1000);
  });

  When('user add the book to the cart', async function () {
 
    await fixture.page.locator("//span[contains(text(),'Add to Cart')]").click();
    await fixture.page.waitForTimeout(1000);
  });

  Then('the cart badge should get updated', async function () {
 
    const badgeCount= await fixture.page.locator("//span[@id='mat-badge-content-0']").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
  });