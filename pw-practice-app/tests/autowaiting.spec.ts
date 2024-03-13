import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    });

    test('Auto Waiting', async({page})=>{
        const successBtn = page.locator('.bg-success')

        // await successBtn.click()

        // await successBtn.waitFor({state:"attached"})
        // const text = await successBtn.allTextContents()
        
        // expect(text).toContain('Data loaded with AJAX get request.')

        await expect(successBtn).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
    })