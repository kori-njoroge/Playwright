import { test, expect, request } from '@playwright/test';
import tagList from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
  console.log('intercept')
  // When creaing a mock do it before the page URL is loaded
  await page.route('*/**/api/tags', async routeTags => {
    console.log('Intercepting API request to /api/tags');

    await routeTags.fulfill({
      body: JSON.stringify(tagList)
    })
  })

  await page.goto("https://conduit.bondaracademy.com/")
})

test('has title', async ({ page }) => {
  console.log('Here we gooo')
  await page.route('*/**/api/articles*', async route => {
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

test('Delete an article', async ({ page, request }) => {
 

  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": { "title": "Kori Test Article", "description": "Testing in Playwright", "body": "**Yaay! Article** in Markdown", "tagList": ["#noTag #testTheTest"] }
    }
  })
  expect(articleResponse.status()).toEqual(201)

  await page.getByText('Global Feed').click()
  await page.getByText('Testing in Playwright').click()
  await page.getByRole('button', { name: 'Delete Article' }).first().click()
  await page.getByText('Global Feed').click()

  // assert that the deleted article is nolonger present
  await expect(page.locator('app-article-list h1').first()).not.toContainText('Kori Test Article')
  await expect(page.locator('app-article-list p').first()).not.toContainText('Testing in Playwright')
})


test('Create and Delete an article from the backend', async ({ page, request }) => {
  await page.getByText('New Article').click()
  await page.getByRole('textbox',{name: 'Article Title'}).fill('Kori Test Article')
  await page.getByRole('textbox',{name: "What's this article about?"}).fill('Testing in Playwright tes test')
  await page.getByRole('textbox',{name: "Write your article (in markdown)"}).fill('Write the article in markdown yaaay!')
  await page.getByRole('textbox',{name: "Enter tags"}).fill('noTags')
  await page.getByRole('button',{name: "Publish Article"}).click()
  const articelResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleREsponsebody = await articelResponse.json()
  const slugId = articleREsponsebody.article.slug
  
  await expect(page.locator('.article-page h1')).toContainText('Kori Test Article')
  // Navigate to home page and validate that the article is displayed
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()


  const deleteArticleRespone = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)
  
  expect(deleteArticleRespone.status()).toEqual(204)
  // Reload to update the conmtents of the page
  await page.reload()
  // Asserting that the articel was deleted
  await expect(page.locator('app-article-list h1').first()).not.toContainText('Kori Test Article')
  await expect(page.locator('app-article-list p').first()).not.toContainText('Testing in Playwright tes test')

})