import { test, expect } from '@playwright/test';
import tagList from '../test-data/tags.json'

test.beforeEach(async({page})=>{
  console.log('intercept')  
  // When creaing a mock do it before the page URL is loaded
  await page.route('*/**/api/tags', async routeTags =>{
    console.log('Intercepting API request to /api/tags');
    
  await routeTags.fulfill({
    body: JSON.stringify(tagList)
  })
})
await page.goto("https://conduit.bondaracademy.com/")
await page.waitForTimeout(500)
})

test('has title', async ({ page }) => {
  console.log('Here we gooo')
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});


