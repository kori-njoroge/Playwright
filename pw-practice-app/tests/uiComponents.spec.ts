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

test('checkboxes',async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox',{name: 'Hide on Click'}).uncheck({force: true})
    await page.getByRole('checkbox',{name: 'Prevent arising of duplicate toast'}).check({force: true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        // await box.check({force: true})
        await box.uncheck({force: true})
        // expect(await box.isChecked()).toBeTruthy()
        expect(await box.isChecked()).toBeFalsy()
    }    
})

test('List and Dropdowns', async({page})=>{
    const dropdownmenu = page.locator('ngx-header nb-select')
    await dropdownmenu.click()

    // Interract with lists on playwright use 'getByRole"
    page.getByRole('list') //Used whe list has UL html tag
    page.getByRole('listitem') //used when list has LI html tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate'])

    await optionList.filter({hasText:'Cosmic'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }
    await dropdownmenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color',colors[color])
        if(color != "Corporate")
            await dropdownmenu.click()
    }
})