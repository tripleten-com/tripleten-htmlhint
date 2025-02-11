import { Rule } from '../types'

export default {
  id: 'tagname-specialchars',
  description: 'All special characters must be escaped.',
  init(parser, reporter) {
    const specialchars = /[^a-zA-Z0-9\-:_]/

    parser.addListener('tagstart,tagend', (event) => {
      const tagName = event.tagName
      if (specialchars.test(tagName)) {
        reporter.error(
          this.id,
          { tagName },
          event.line,
          event.col,
          this,
          event.raw,
          `The html element name of [ ${tagName} ] contains special character.`
        )
      }
    })
  },
} as Rule
