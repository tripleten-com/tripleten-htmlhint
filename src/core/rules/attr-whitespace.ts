import { Rule } from '../types'

export default {
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  init(parser, reporter, options) {
    const exceptions: Array<string | boolean> = Array.isArray(options)
      ? options
      : []

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      attrs.forEach((elem) => {
        attr = elem
        const attrName = elem.name

        if (exceptions.indexOf(attrName) !== -1) {
          return
        }

        // Check first and last characters for spaces
        if (elem.value.trim() !== elem.value) {
          reporter.error(
            this.id + '.no-trailing',
            { attrName },
            event.line,
            col + attr.index,
            this,
            attr.raw,
            `The attributes of [ ${attrName} ] must not have leading or trailing whitespace.`
          )
        }

        if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
          reporter.error(
            this.id + '.separated-by-one',
            { attrName },
            event.line,
            col + attr.index,
            this,
            attr.raw,
            `The attributes of [ ${attrName} ] must be separated by only one space.`
          )
        }
      })
    })
  },
} as Rule
