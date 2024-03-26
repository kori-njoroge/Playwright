import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGrid(email: string, password: string, option: string){
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: option }).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
    /**
     * this method fill out the inline orm with user details
     * @param name - should be fisrt and last name
     * @param email - valid user email
     * @param rememberMe - true or false
     */
    async submitInlineForm(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline Form'});
        await inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await inlineForm.getByPlaceholder('Email').fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}