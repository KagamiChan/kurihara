describe('homepage', () => {
  beforeEach(async () => {
    await page.goto('http://127.0.0.1:5000/')
  })

  it('display', async () => {
    await expect(page).toMatchElement('#site-title')
  })
})

describe('post', () => {
  it('displays posts', async () => {
    await page.goto('http://127.0.0.1:5000/blog/2015-01-17-juzhen-fangsong/')
    await page.waitFor(300) // i18n may take some time
  })
})
