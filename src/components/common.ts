import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const Article = styled.article``

export const commonMargin = css`
  ${tw`ml-0 md:ml-12`}
`

export const commonLink = css`
  ${tw`text-blue-500 duration-100`}

  :hover {
    ${tw`bg-blue-100`}
  }
`

export const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${tw`leading-relaxed font-medium mb-4`}
  }

  h1 {
    ${tw`text-4xl`}
  }

  h2 {
    ${tw`text-3xl`}
  }

  h3 {
    ${tw`text-2xl`}
  }

  h4 {
    ${tw`text-xl`}
  }

  h5 {
    ${tw`text-lg`}
  }

  a:not(.gatsby-resp-image-link) {
    ${commonLink}
  }

  p {
    ${tw`mb-4`}
    ${tw`leading-relaxed`}
  }

  ol {
    ${tw`list-decimal list-inside`}
  }

  ul {
    ${tw`list-disc list-inside`}
  }

  li {
    ${tw`mb-2`}
  }

  hr {
    ${tw`mb-4`}
  }
`

export const Title = styled.h1`
  ${tw`leading-relaxed font-medium mb-4 text-6xl`}
`

export const FooterWrapper = styled.div`
  ${tw`mt-4 mb-4`}

  a {
    ${commonLink}
  }
`
