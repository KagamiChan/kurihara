/**
 * util to create a blank blog post
 * usage: node draft.js hello world
 */
const matter = require('gray-matter')
const path = require('path')
const { format } = require('date-fns')
const { toLower } = require('lodash')
const fs = require('fs-extra')

const postsPath = path.resolve(__dirname, '../src/posts')

const draft = async date => {
  try {
    const title = process.argv
      .slice(2)
      .join(' ')
      .split(' ')
      .map(toLower)
      .join('-')
    const directory = path.join(
      postsPath,
      `${format(date, 'YYYY-MM-DD')}-${title}`,
    )

    await fs.ensureDir(directory)

    const content = matter.stringify(
      '曲曲折折的荷塘上面，弥望的是田田的叶子。',
      {
        title: process.argv.slice(2).join(' '),
        publish_date: format(date),
        revise_date: format(date),
        tags: [],
        draft: true,
      },
    )

    await fs.writeFile(path.join(directory, 'index.md'), content)
  } catch (e) {
    console.warn(e)
    process.exitCode = 1
  }
}

draft(new Date())
