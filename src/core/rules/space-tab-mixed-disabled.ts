import { Rule } from '../types'

export default {
  id: 'space-tab-mixed-disabled',
  description: 'Do not mix tabs and spaces for indentation.',
  init(parser, reporter, options) {
    let indentMode = 'nomix'
    let spaceLengthRequire: number | '' | null = null

    if (typeof options === 'string') {
      const match = /^([a-z]+)(\d+)?/.exec(options)
      if (match) {
        indentMode = match[1]
        spaceLengthRequire = match[2] && parseInt(match[2], 10)
      }
    }

    parser.addListener('text', (event) => {
      const raw = event.raw
      const reMixed = /(^|\r?\n)([ \t]+)/g
      let match

      while ((match = reMixed.exec(raw))) {
        const fixedPos = parser.fixPos(event, match.index + match[1].length)
        if (fixedPos.col !== 1) {
          continue
        }

        const whiteSpace = match[2]
        if (indentMode === 'space') {
          if (spaceLengthRequire) {
            if (
              /^ +$/.test(whiteSpace) === false ||
              whiteSpace.length % spaceLengthRequire !== 0
            ) {
              reporter.warn(
                this.id + '.space-length',
                { spaceLengthRequire },
                fixedPos.line,
                1,
                this,
                event.raw,
                `Please use space for indentation and keep ${spaceLengthRequire} length.`
              )
            }
          } else {
            if (/^ +$/.test(whiteSpace) === false) {
              reporter.warn(
                this.id + '.space',
                {},
                fixedPos.line,
                1,
                this,
                event.raw,
                'Please use space for indentation.'
              )
            }
          }
        } else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
          reporter.warn(
            this.id + '.tab',
            {},
            fixedPos.line,
            1,
            this,
            event.raw,
            'Please use tab for indentation.'
          )
        } else if (/ +\t|\t+ /.test(whiteSpace) === true) {
          reporter.warn(
            this.id + '.no-mix',
            {},
            fixedPos.line,
            1,
            this,
            event.raw,
            'Do not mix tabs and spaces for indentation.'
          )
        }
      }
    })
  },
} as Rule
