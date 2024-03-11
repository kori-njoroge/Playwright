import {test} from "@playwright/test";

test.beforeEach(async({page}) =>{
    await page.goto("http://localhost:4200/"); // Goes to the homepage of the application
        // page.goto returns a promise we need to use asynchronous nature "await"
        // for the methods with promise return type always use "Async -Await"
        // await page.getByText('Forms').click()
        // await page.getByText('Form Layouts').click()
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

test.describe("Locator Syntax", ()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test("Locator sysntax Rules",async({page})=>{
        // locate by tag name
        await page.locator('input').first().click()

        // Loacte by ID
        page.locator('#inputEmail1')

        // Locate by calss value
        page.locator('.shape-rectangle')

        // by attribute
        page.locator('[placeholder="Email"]')

        // by class value (full)
        page.locator('[Class="input-full width more-class-names"]')

        // Combine different selectors
        page.locator('input[placeholder="Email"].shape-rectangle[nbinput]')

        // by XPath(NOT RECOMMENDED)
        page.locator('//*[@id="inputEmail1]')

        // by partial text match
        page.locator(':text("Using")')

        // by exact text match
        page.locator(':text-is("Using the Grid")')
    })
})

test.describe.only("Using user facing locators",()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('UUFL', async({page})=>{
        await page.getByRole('textbox', {name:'Email'}).first().click()
        await page.getByRole('button', {name:'Sign in'}).first().click()

        await page.getByLabel('Email address').first().click()

        await page.getByPlaceholder('Password').first().click()

        await page.getByText('Using the Grid').click()

        await page.getByTestId('SignIn').click()

        await page.getByTitle('IoT Dashboard').click()
    })
})