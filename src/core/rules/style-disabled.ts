import { Rule } from '../types'

export default {
  id: 'style-disabled',
  description: '<style> tags cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      if (event.tagName.toLowerCase() === 'style') {
        reporter.warn(
          this.id,
          {},
          event.line,
          event.col,
          this,
          event.raw,
          'The <style> tag cannot be used.'
        )
      }
    })
  },
} as Rule
