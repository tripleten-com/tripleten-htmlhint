"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init(parser, reporter) {
        const stack = [];
        const mapEmptyTags = parser.makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr');
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close) {
                stack.push({
                    tagName: tagName,
                    line: event.line,
                    raw: event.raw,
                });
            }
        });
        parser.addListener('tagend', (event) => {
            const tagName = event.tagName.toLowerCase();
            let pos;
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].tagName === tagName) {
                    break;
                }
            }
            if (pos >= 0) {
                const arrTags = [];
                for (let i = stack.length - 1; i > pos; i--) {
                    arrTags.push(`</${stack[i].tagName}>`);
                }
                if (arrTags.length > 0) {
                    const lastEvent = stack[stack.length - 1];
                    reporter.error(this.id + '.paired-start', {
                        tags: arrTags.join(''),
                        lastEventRaw: lastEvent.raw || '',
                        lastEventLine: lastEvent.line || 0,
                    }, event.line, event.col, this, event.raw, `Tag must be paired, missing: [ ${arrTags.join('')} ], start tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`);
                }
                stack.length = pos;
            }
            else {
                reporter.error(this.id + '.no-start', { eventRaw: event.raw }, event.line, event.col, this, event.raw, `Tag must be paired, no start tag: [ ${event.raw} ]`);
            }
        });
        parser.addListener('end', (event) => {
            const arrTags = [];
            for (let i = stack.length - 1; i >= 0; i--) {
                arrTags.push(`</${stack[i].tagName}>`);
            }
            if (arrTags.length > 0) {
                const lastEvent = stack[stack.length - 1];
                reporter.error(this.id + '.paired-open', {
                    tags: arrTags.join(''),
                    lastEventRaw: lastEvent.raw || '',
                    lastEventLine: lastEvent.line || 0,
                }, event.line, event.col, this, '', `Tag must be paired, missing: [ ${arrTags.join('')} ], open tag match failed [ ${lastEvent.raw} ] on line ${lastEvent.line}.`);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWctcGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLEtBQUssR0FBMEIsRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLDRHQUE0RyxDQUM3RyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2lCQUNmLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFHM0MsSUFBSSxHQUFHLENBQUE7WUFDUCxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEtBQUss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