"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'attr-value-not-empty',
    description: 'All attributes must have values.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                if (attr.quote === '' && attr.value === '') {
                    reporter.warn(this.id, { attrName: attr.name }, event.line, col + attr.index, this, attr.raw, `The attribute [ ${attr.name} ] must have a value.`);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci12YWx1ZS1ub3QtZW1wdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9hdHRyLXZhbHVlLW5vdC1lbXB0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixXQUFXLEVBQUUsa0NBQWtDO0lBQy9DLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUE7WUFDUixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVmLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7b0JBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsSUFBSSxDQUFDLEVBQUUsRUFDUCxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQ3ZCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsR0FBRyxFQUNSLG1CQUFtQixJQUFJLENBQUMsSUFBSSx1QkFBdUIsQ0FDcEQsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9