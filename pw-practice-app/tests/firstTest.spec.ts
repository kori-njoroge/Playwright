import {test} from "@playwright/test";

test.beforeEach(async({page}) =>{
    await page.goto("http://localhost:4200/"); // Goes to the homepage of the application
        // page.goto returns a promise we need to use asynchronous nature "await"
        // for the methods with promise return type always use "Async -Await"
})

// Grouping tests
test.describe("Test Suite 1", () =>{
    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click();
    })
    
    
    // > Need to pass the page fixture as the urgument in the test
    test("The first test", async ({page}) =>{
        await page.getByText('Form Layouts').click();
    })
    
    test("Navigate to datepicker page",async({page}) =>{
        await page.getByText('Datepicker').click()
    })
    
})

test.describe("Test suite 2", ()=>{
    test.beforeEach(async({page})=>{
        await page.getByText("Modal & Overlays").click()
    })

    test("The second Test", async({page})=>{
        await page.getByText("Dialog").click()
    })

})


