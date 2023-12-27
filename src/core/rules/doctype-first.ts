import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'doctype-first',
  description: 'Doctype must be declared first.',
  init(parser, reporter) {
    const allEvent: Listener = (event) => {
      if (
        event.type === 'start' ||
        (event.type === 'text' && /^\s*$/.test(event.raw))
      ) {
        return
      }

      if (
        (event.type !== 'comment' && event.long === false) ||
        /^DOCTYPE\s+/i.test(event.content) === false
      ) {
        reporter.error(
          this.id,
          {},
          event.line,
          event.col,
          this,
          event.raw,
          'Doctype must be declared first.'
        )
      }

      parser.removeListener('all', allEvent)
    }

    parser.addListener('all', allEvent)
  },
} as Rule
