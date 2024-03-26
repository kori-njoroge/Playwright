import {test} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')

})

test("Navigate to form page", async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toolTipPage()
    await pm.navigateTo().toastrPAge()
})

test('Parameterized Methods', async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGrid('kori@test.com','Password','Option 1')
    await pm.onFormLayoutsPage().submitInlineForm('Gideon Kori','Kori@test.com',true)

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(200)
    // await onDatePickerPage.selectDatePickerWithRangeFromToday(6,20)
})
