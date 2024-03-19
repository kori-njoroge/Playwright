import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')

})

test.describe("Ui Components",()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page})=>{
        const usingTheGridEmailfield = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailfield.fill('kori@test.com') //fill the inout field
        await usingTheGridEmailfield.clear()

        await usingTheGridEmailfield.pressSequentially('kori@testtest.com',{delay: 50}) //simulates key strokes, you can delay betweent he key strokes

        //Generic assertions
        const inputValue = await usingTheGridEmailfield.inputValue()
        expect(inputValue).toEqual('kori@testtest.com')

        // Locator assertion
        await expect(usingTheGridEmailfield).toHaveValue('kori@testtest.com')
    })

    test("Radio buttons", async({page})=>{
        const usingTheGridEmailForm = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridEmailForm.getByLabel('Option 1').check({force: true})
        const radioStatus =  await usingTheGridEmailForm.getByRole('radio', {name: "Option 1"}).isChecked()
        
        //Assertions
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridEmailForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridEmailForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridEmailForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
        expect(await usingTheGridEmailForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
    })
})