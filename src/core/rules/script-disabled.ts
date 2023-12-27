import { Rule } from '../types'

export default {
  id: 'script-disabled',
  description: 'The <script> tag cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      if (event.tagName.toLowerCase() === 'script') {
        reporter.error(
          this.id,
          {},
          event.line,
          event.col,
          this,
          event.raw,
          'The <script> tag cannot be used.'
        )
      }
    })
  },
} as Rule
