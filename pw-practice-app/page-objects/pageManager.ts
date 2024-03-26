import { Page, expect } from "@playwright/test";
import { NavigatioPage } from "../page-objects/navigatioPage"
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from "../page-objects/datePickerPage"

export class PageManager{

    private readonly page : Page
    private readonly navitionPage : NavigatioPage
    private readonly formLayoutPage : FormLayoutsPage
    private readonly datePickerPage : DatePickerPage
    

    constructor(page: Page){
        this.page = page
        this.navitionPage = new NavigatioPage(this.page)
        this.formLayoutPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo(){
        return this.navitionPage
    }
    onFormLayoutsPage(){
        return this.formLayoutPage
    }
    onDatePickerPage(){
        return this.datePickerPage
    }
}