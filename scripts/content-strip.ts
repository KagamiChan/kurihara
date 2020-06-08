import { replaceInFile } from 'replace-in-file'

const files = process.argv.slice(2)

/**
 * Squirrel could accidently leave backspace character (u0008) in markdown contents, breaking browser rss renderer
 */
const main = async (): Promise<void> => {
  try {
    await replaceInFile({
      files,
      from: [/\u0008/g], // eslint-disable-line no-control-regex
      to: '',
    })
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  }
}

main()
