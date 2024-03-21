import {test} from "@playwright/test"
import { NavigatioPage } from "../page-objects/navigatioPage"

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