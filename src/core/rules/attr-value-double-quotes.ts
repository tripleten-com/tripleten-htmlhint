import { Rule } from '../types'

export default {
  id: 'attr-value-double-quotes',
  description: 'Attribute values must be in double quotes.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (
          (attr.value !== '' && attr.quote !== '"') ||
          (attr.value === '' && attr.quote === "'")
        ) {
          reporter.error(
            this.id,
            { attrName: attr.name },
            event.line,
            col + attr.index,
            this,
            attr.raw,
            `The value of attribute [ ${attr.name} ] must be in double quotes.`
          )
        }
      }
    })
  },
} as Rule
