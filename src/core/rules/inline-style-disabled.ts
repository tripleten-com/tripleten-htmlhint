import { Rule } from '../types'

export default {
  id: 'inline-style-disabled',
  description: 'Inline style cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (attr.name.toLowerCase() === 'style') {
          reporter.warn(
            this.id,
            { attrRaw: attr.raw },
            event.line,
            col + attr.index,
            this,
            attr.raw,
            `Inline style [ ${attr.raw} ] cannot be used.`
          )
        }
      }
    })
  },
} as Rule
