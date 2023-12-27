import { Rule } from '../types'

export default {
  id: 'empty-tag-not-self-closed',
  description: 'Empty tags must not use self closed syntax.',
  init(parser, reporter) {
    const mapEmptyTags = parser.makeMap(
      'area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    ) //HTML 4.01 + HTML 5

    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      if (mapEmptyTags[tagName] !== undefined) {
        if (event.close) {
          reporter.error(
            this.id,
            { tagName },
            event.line,
            event.col,
            this,
            event.raw,
            `The empty tag : [ ${tagName} ] must not use self closed syntax.`
          )
        }
      }
    })
  },
} as Rule
