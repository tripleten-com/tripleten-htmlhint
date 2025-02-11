import { Rule } from '../types'

let tagsTypings: Record<string, Record<string, unknown>> = {
  a: {
    selfclosing: false,
    attrsRequired: ['href', 'title'],
    redundantAttrs: ['alt'],
  },
  div: {
    selfclosing: false,
  },
  main: {
    selfclosing: false,
    redundantAttrs: ['role'],
  },
  nav: {
    selfclosing: false,
    redundantAttrs: ['role'],
  },
  script: {
    attrsOptional: [
      ['async', 'async'],
      ['defer', 'defer'],
    ],
  },
  img: {
    selfclosing: true,
    attrsRequired: ['src', 'alt', 'title'],
  },
}

export default {
  id: 'tags-check',
  description: 'Checks html tags.',
  init(parser, reporter, options: Record<string, Record<string, unknown>>) {
    tagsTypings = { ...tagsTypings, ...options }

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      const col = event.col + event.tagName.length + 1

      const tagName = event.tagName.toLowerCase()

      if (tagsTypings[tagName]) {
        const currentTagType = tagsTypings[tagName]

        if (currentTagType.selfclosing === true && !event.close) {
          reporter.warn(
            this.id + '.selfclosing',
            { tagName },
            event.line,
            event.col,
            this,
            event.raw,
            `The <${tagName}> tag must be selfclosing.`
          )
        } else if (currentTagType.selfclosing === false && event.close) {
          reporter.warn(
            this.id + '.not-selfclosing',
            { tagName },
            event.line,
            event.col,
            this,
            event.raw,
            `The <${tagName}> tag must not be selfclosing.`
          )
        }

        if (Array.isArray(currentTagType.attrsRequired)) {
          const attrsRequired: Array<string | string[]> =
            currentTagType.attrsRequired
          attrsRequired.forEach((id) => {
            if (Array.isArray(id)) {
              const copyOfId = id.map((a) => a)
              const realID = copyOfId.shift() || ''
              const values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      this.id + '.attr-with-value',
                      {
                        tagName,
                        attrName: realID,
                        // todo: attrName: realID_1,
                        values: values.join(', '),
                        // todo: values: values_1.join(', '),
                      },
                      event.line,
                      col,
                      this,
                      event.raw,
                      `The <${tagName}> tag must have attr '${realID}' with one value of '${values.join(
                        "' or '"
                      )}'.`
                    )
                  }
                })
              } else {
                reporter.error(
                  this.id + '.attr-required',
                  { tagName, attrName: realID },
                  // todo: { tagName, attrName: realID_1 },
                  event.line,
                  col,
                  this,
                  event.raw,
                  `The <${tagName}> tag must have attr '${realID}'.`
                )
              }
            } else if (
              !attrs.some((attr) => id.split('|').indexOf(attr.name) !== -1)
            ) {
              reporter.error(
                this.id + '.attr-required',
                { tagName, attrName: id },
                event.line,
                col,
                this,
                event.raw,
                `The <${tagName}> tag must have attr '${id}'.`
              )
            }
          })
        }

        if (Array.isArray(currentTagType.attrsOptional)) {
          const attrsOptional: string[][] = currentTagType.attrsOptional
          attrsOptional.forEach((id) => {
            if (Array.isArray(id)) {
              const copyOfId = id.map((a) => a)
              const realID = copyOfId.shift()
              const values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      this.id + '..optional-attr-with-values',
                      {
                        tagName,
                        attrName: realID,
                        values: values.join(', '),
                        // todo: attrName: realID_2,
                        // todo: values: values_2.join(', '),
                      },
                      event.line,
                      col,
                      this,
                      event.raw,
                      `The <${tagName}> tag must have optional attr '${realID}' with one value of '${values.join(
                        "' or '"
                      )}'.`
                    )
                  }
                })
              }
            }
          })
        }

        if (Array.isArray(currentTagType.redundantAttrs)) {
          const redundantAttrs: string[] = currentTagType.redundantAttrs
          redundantAttrs.forEach((attrName) => {
            if (attrs.some((attr) => attr.name === attrName)) {
              reporter.error(
                this.id + '.attr-is-redundant',
                { tagName, attrName },
                event.line,
                col,
                this,
                event.raw,
                `The attr '${attrName}' is redundant for <${tagName}> and should be omitted.`
              )
            }
          })
        }
      }
    })
  },
} as Rule
