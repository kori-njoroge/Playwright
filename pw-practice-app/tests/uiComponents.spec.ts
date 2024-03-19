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
})