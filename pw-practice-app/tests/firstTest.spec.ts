import {test} from "@playwright/test";

// Grouping tests

// test.describe("Test Suite 1", () =>{
//     test('The first test', () =>{
    
//     })
    
// })

// > Need to pass the page fixture as the urgument in the test
test("The first test", async ({page}) =>{
    await page.goto("http://localhost:4200/"); // Goes to the homepage of the application
    // page.goto returns a promise we need to use asynchronous nature "await"
    // for the methods with promise return type always use "Async -Await"
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

})

