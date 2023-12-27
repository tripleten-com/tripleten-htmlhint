import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'doctype-html5',
  description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
  init(parser, reporter) {
    const onComment: Listener = (event) => {
      if (
        event.long === false &&
        event.content.toLowerCase() !== 'doctype html'
      ) {
        reporter.warn(
          this.id,
          {},
          event.line,
          event.col,
          this,
          event.raw,
          'Invalid doctype. Use: "<!DOCTYPE html>"'
        )
      }
    }

    const onTagStart: Listener = () => {
      parser.removeListener('comment', onComment)
      parser.removeListener('tagstart', onTagStart)
    }

    parser.addListener('all', onComment)
    parser.addListener('tagstart', onTagStart)
  },
} as Rule
