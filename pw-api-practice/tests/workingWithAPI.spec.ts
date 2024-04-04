import { test, expect, request } from '@playwright/test';
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
// login process
await page.getByText('Sign in').click()
await page.getByRole('textbox', {name:'Email'}).fill('pwtest@test.com')
await page.getByRole('textbox', {name:'Password'}).fill('Welcome1')
await page.getByRole('button',{name:'Sign in'}).click()
await page.waitForTimeout(500)
})

test('has title', async ({ page }) => {
  console.log('Here we gooo')
  await page.route('*/**/api/articles*', async route =>{
    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "This is a MOCK test title"
    responseBody.articles[0].description = "This is a MOCK description"
    
    await route.fulfill({
      body: JSON.stringify(responseBody)
    });
  })

  await page.getByText('Global Feed').click()
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description')
  // if you do not have assertions please enter a temporary timeout so that playwright can complete execution before ccompleting the test
});

test('Delete an article', async({page,request})=>{
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data: {
      "user":{"email":"pwtest@test.com","password":"Welcome1"}
    }
  })
  const responseBody = await response.json()
  const accessToken = await responseBody.user.token

  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
    data :{
      "article":{"title":"Kori Test Article","description":"Testing in Playwright","body":"**Yaay! Article** in Markdown","tagList":["#noTag #testTheTest"]}
    },
    headers: {
      Authorization: `Token ${accessToken}`
    }
  })
  expect(articleResponse.status()).toEqual(201)

  await page.getByText('Global Feed').click()
  await page.getByText('Testing in Playwright').click()
  await page.getByRole('button', {name:'Delete Article'}).first().click()
  await page.getByText('Global Feed').click()

  // assert that the deleted article is nolonger present
  await expect(page.locator('app-article-list h1').first()).not.toContainText('Kori Test Article')
  await expect(page.locator('app-article-list p').first()).not.toContainText('Testing in Playwright')
})


// https://conduit-api.bondaracademy.com/api/articles/
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyfSwiaWF0IjoxNzEyMjI4NDc2LCJleHAiOjE3MTc0MTI0NzZ9.DOiC-WnoGXTRnCioSSmt0DM_66vMw2r1yLWF2pwepQA