"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'style-disabled',
    description: '<style> tags cannot be used.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            if (event.tagName.toLowerCase() === 'style') {
                reporter.warn(this.id, {}, event.line, event.col, this, event.raw, 'The <style> tag cannot be used.');
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9zdHlsZS1kaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQUUsOEJBQThCO0lBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7Z0JBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsSUFBSSxDQUFDLEVBQUUsRUFDUCxFQUFFLEVBQ0YsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxFQUNULGlDQUFpQyxDQUNsQyxDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=