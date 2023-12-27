"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'tagname-lowercase',
    description: 'All html element names must be in lowercase.',
    init(parser, reporter, options) {
        const exceptions = Array.isArray(options)
            ? options
            : [];
        parser.addListener('tagstart,tagend', (event) => {
            const tagName = event.tagName;
            if (exceptions.indexOf(tagName) === -1 &&
                tagName !== tagName.toLowerCase()) {
                reporter.error(this.id, { tagName }, event.line, event.col, this, event.raw, `The html element name of [ ${tagName} ] must be in lowercase.`);
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnbmFtZS1sb3dlcmNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy90YWduYW1lLWxvd2VyY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQUUsOENBQThDO0lBQzNELElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDNUIsTUFBTSxVQUFVLEdBQTRCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUVOLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBO1lBQzdCLElBQ0UsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sS0FBSyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQ2pDO2dCQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLEVBQUUsRUFDUCxFQUFFLE9BQU8sRUFBRSxFQUNYLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCw4QkFBOEIsT0FBTywwQkFBMEIsQ0FDaEUsQ0FBQTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9