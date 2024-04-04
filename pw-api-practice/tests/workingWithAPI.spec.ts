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

await page.route('*/**/api/articles*', async route =>{
  const response = await route.fetch()
  const responseBody = await response.json()
  responseBody.articles[0].title = "This is a test title"
  responseBody.articles[0].description = "This is a description"
  
  await route.fulfill({
    body: JSON.stringify(responseBody)
  });
})

await page.goto("https://conduit.bondaracademy.com/")
await page.waitForTimeout(500)
})

test('has title', async ({ page }) => {
  console.log('Here we gooo')
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title')
  await expect(page.locator('app-article-list p').first()).toContainText('This is a description')
  // is you do not have assertions please enter a temporary timeout so that playwright can complete execution before ccompleting the test
});


