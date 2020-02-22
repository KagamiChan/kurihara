/**
 * util to create a blank blog post
 * usage: node draft.js hello world
 */
import matter from 'gray-matter'
import path from 'path'
import { format } from 'date-fns'
import { toLower } from 'lodash'
import fs from 'fs-extra'

const postsPath = path.resolve(__dirname, '../content/blog')

const draft = async (date: Date): Promise<void> => {
  try {
    const title =
      process.argv
        .slice(2)
        .join(' ')
        .split(' ')
        .map(toLower)
        .join('-') || '荷塘月色'
    const directory = path.join(
      postsPath,
      `${format(date, 'yyyy-MM-dd')}-${title}`,
    )

    await fs.ensureDir(directory)

    const content = matter.stringify(
      '曲曲折折的荷塘上面，弥望的是田田的叶子。',
      {
        title,
        publish_date: format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`), // eslint-disable-line @typescript-eslint/camelcase
        revise_date: format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`), // eslint-disable-line @typescript-eslint/camelcase
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
