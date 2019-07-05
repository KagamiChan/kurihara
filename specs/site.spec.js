import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })
jest.retryTimes(3)

const expectSnapshot = async id => {
  const image = await page.screenshot()
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: id,
  })
}

describe('homepage', () => {
  beforeEach(async () => {
    await page.goto('http://127.0.0.1:5000/?testing=1')
  })

  it('display', async () => {
    await expect(page).toMatchElement('#site-title')
    await expectSnapshot('homepage')
  })

  it('language switch works', async () => {
    await page.hover('.language-switch .bp3-popover-target')
    await page.waitFor('.language-switch .bp3-popover-open')
    await page.waitFor(500) // possible animations
    await expectSnapshot('homepage-language')

    await page.click('.language-switch-item[data-testid="ja"]')
    await expectSnapshot('homepage-language-ja')
  })
})

describe('post', () => {
  it('displays posts', async () => {
    await page.goto('http://127.0.0.1:5000/blog/2015-01-17-juzhen-fangsong/')
    await page.waitFor(100) // i18n may take sometime
    await expectSnapshot('post-juzhen-fangsong')
  })
})
