import ghpages from 'gh-pages'
import path from 'path'

declare module 'gh-pages' {
  interface PublishOptions {
    history?: boolean
  }
}

const main = async () => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('No token specified.')
    }

    if (!process.env.GITHUB_REPOSITORY) {
      throw new Error(
        'No repository info detected, this script is expected to run in GitHub actions.',
      )
    }

    console.info(`Deploying to ${process.env.GITHUB_REPOSITORY}`)

    await ghpages.publish(path.resolve(__dirname, '../public'), {
      branch: 'release',
      silent: true,
      repo: `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
      dotfiles: true,
      history: false,
      user: {
        name: 'Llenn ちゃん',
        email: 'bot@kagami.me',
      },
    })
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  }
}

main()
