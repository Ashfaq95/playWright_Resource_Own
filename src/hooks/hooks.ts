import{ BeforeAll, AfterAll, Before, After,BeforeStep,AfterStep, Status} from "@cucumber/cucumber";
import{chromium,Browser, Page, BrowserContext} from "@playwright/test";
import{ fixture} from "./pageFixture"
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";

let page : Page;
let browser : Browser;
let context : BrowserContext;

BeforeAll(async function(){
    getEnv();
    browser= await invokeBrowser();
});

Before(async function({pickle}){
    const scenarioName = pickle.name + pickle.id //There could be same named scenario with same type of examples in the feature file and to make it unique we used id
    context = await browser.newContext();
    const page = await browser.newPage();
    fixture.page = page;
    fixture.logger =createLogger(options(scenarioName));//enable logger for each and every scenario

});

 //screenshot
//If user wants to take SS after every steps
//Pickle is a Python module that allows you to serialize and deserialize Python objects
// AfterStep(async function({pickle,result}){
//     const img =  await pageFixture.page.screenshot({ path:`./test-result/screenshots/${pickle.name}.png`,type: "png"})
//     await this.attach(img, "image/png");
// });


//Take the SS if there's any failure
//pickle implies the serialization and deserialization of objects or data structures(EX: screenshots)
After(async function({pickle,result}){
    console.log(result?.status);
   
    if(result?.status==Status.FAILED){
        const img =  await fixture.page.screenshot({ path:`./test-results/screenshots/${pickle.name}.png`,type: "png"})
        await this.attach(img, "image/png");
    }
    await fixture.page.close();
    await context.close();
})

AfterAll(async function(){
    await browser.close();
    fixture.logger.close();
})
