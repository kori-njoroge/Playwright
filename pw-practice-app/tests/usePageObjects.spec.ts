import {test} from "@playwright/test"
import { NavigatioPage } from "../page-objects/navigatioPage"
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from "../page-objects/datePickerPage"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')

})

test("Navigate to form page", async({page})=>{
    const navigateto = new NavigatioPage(page)
    await navigateto.formLayoutsPage()
    await navigateto.datePickerPage()
    await navigateto.smartTablePage()
    await navigateto.toolTipPage()
    await navigateto.toastrPAge()
})

test('Parameterized Methods', async({page})=>{
    const navigateTo = new NavigatioPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGrid('kori@test.com','Password','Option 1')
    await onFormLayoutsPage.submitInlineForm('Gideon Kori','Kori@test.com',true)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(200)
    // await onDatePickerPage.selectDatePickerWithRangeFromToday(6,20)
})