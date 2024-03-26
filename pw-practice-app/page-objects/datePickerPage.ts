import {Page, expect} from '@playwright/test'

export class DatePickerPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numerofDaysFomToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numerofDaysFomToday)
        
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }
    
    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday : number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)

        const dateToAssert = `${dateToAssertStart} -${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numerofDaysFomToday: number){

        let date = new Date()
        date.setDate(date.getDate() + numerofDaysFomToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleDateString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleDateString('En-US', { month: 'long' })

        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while (!calendarMonthYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()

        return dateToAssert;
    }
}