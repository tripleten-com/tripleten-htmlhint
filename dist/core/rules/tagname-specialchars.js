"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tagname-specialchars',
    description: 'All special characters must be escaped.',
    init(parser, reporter) {
        const specialchars = /[^a-zA-Z0-9\-:_]/;
        parser.addListener('tagstart,tagend', (event) => {
            const tagName = event.tagName;
            if (specialchars.test(tagName)) {
                reporter.error(this.id, { tagName }, event.line, event.col, this, event.raw, `The html element name of [ ${tagName} ] contains special character.`);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1zcGVjaWFsY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLXNwZWNpYWxjaGFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUseUNBQXlDO0lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQTtRQUV2QyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUM3QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLEVBQUUsRUFDUCxFQUFFLE9BQU8sRUFBRSxFQUNYLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCw4QkFBOEIsT0FBTyxnQ0FBZ0MsQ0FDdEUsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9