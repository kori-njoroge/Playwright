import {test,expect} from "@playwright/test";

test.beforeEach(async({page}) =>{
    await page.goto("http://localhost:4200/"); // Goes to the homepage of the application
        // page.goto returns a promise we need to use asynchronous nature "await"
        // for the methods with promise return type always use "Async -Await"
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
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

test.describe("Using user facing locators",()=>{
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

test.describe('Locating  Elements', ()=>{
    test('locating Child elements', async({page})=>{
        const child = 'nb-card nb-radio :text-is("Option 1")'
        await page.locator(child).click()
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
        // Both lines above perfom same action

        await page.locator('nb-card').getByRole('button',{name: 'Sign in'}).first().click()//Combining regular locator with user facing locators

        await page.locator('nb-card').nth(3).getByRole('button').click(); //Not preferrable - the order of web elements can be changed.

    })

    test('locating parent elements', async({page})=>{
        // 1. checking the text inside
        await page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'}).click()

        // 2. Using a locator inside the card
        await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox',{name:'Email'}).click()

        // 3. Using filter
        await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox',{name:'Email'}).click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:'Password'}).click()

        // 4. combine alot of them
        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox',{name:'Password'}).click()

        // 5. Go a level up- NOT RECOMMENDED
        await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:'Password'}).click()
    })

    test('Reusing Locators', async({page})=>{
        // Variables
        const basicForm =page.locator('nb-card').filter({hasText: 'Basic form'})
        const emailField = basicForm.getByRole('textbox',{name:"Email"})

        // Insert values
        await emailField.fill("korijunior106@gmail.com")
        await basicForm.getByRole('textbox',{name:'Password'}).fill("Welcome123")
        await basicForm.locator(':text-is("Check me out")').check()
        await basicForm.getByRole('button').click()
        
        // Asserions
        await expect(emailField).toHaveValue("korijunior106@gmail.com")
    })

    test('Extracting Values from DOM', async({page})=>{
        // Get single test value
        const basicForm =page.locator('nb-card').filter({hasText: 'Basic form'})
        const buttonText = await basicForm.locator('button').textContent()
        expect(buttonText).toEqual('Submit')

        // Get all Text values
        const allRadioButtnLables= await page.locator('nb-radio').allTextContents()
        expect(allRadioButtnLables).toContain('Option 1')

        // How to get the Value of the input field.
        const emailField =basicForm.getByRole('textbox',{name:'Email'})
        await emailField.fill('korijunior106@gmail.com')
        const emailValue = await emailField.inputValue()

        expect(emailValue).toEqual('korijunior106@gmail.com')

    })
})
