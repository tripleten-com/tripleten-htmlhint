"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regular = '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)';
const irregular = '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)';
const grandfathered = `(?<grandfathered>${irregular}|${regular})`;
const privateUse = '(?<privateUse>x(-[A-Za-z0-9]{1,8})+)';
const privateUse2 = '(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)';
const singleton = '[0-9A-WY-Za-wy-z]';
const extension = `(?<extension>${singleton}(-[A-Za-z0-9]{2,8})+)`;
const variant = '(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})';
const region = '(?<region>[A-Za-z]{2}|[0-9]{3})';
const script = '(?<script>[A-Za-z]{4})';
const extlang = '(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})';
const language = `(?<language>([A-Za-z]{2,3}(-${extlang})?)|[A-Za-z]{4}|[A-Za-z]{5,8})`;
const langtag = `(${language}(-${script})?` +
    `(-${region})?` +
    `(-${variant})*` +
    `(-${extension})*` +
    `(-${privateUse})?` +
    ')';
const languageTag = `(${grandfathered}|${langtag}|${privateUse2})`;
exports.default = {
    id: 'html-lang-require',
    description: 'The lang attribute of an <html> element must be present and should be valid.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const tagName = event.tagName.toLowerCase();
            const mapAttrs = parser.getMapAttrs(event.attrs);
            const col = event.col + tagName.length + 1;
            const langValidityPattern = new RegExp(languageTag, 'g');
            if (tagName === 'html') {
                if ('lang' in mapAttrs) {
                    if (!mapAttrs['lang']) {
                        reporter.warn(this.id + '.empty', {}, event.line, col, this, event.raw, 'The lang attribute of <html> element must have a value.');
                    }
                    else if (!langValidityPattern.test(mapAttrs['lang'])) {
                        reporter.warn(this.id + '.invalid', {}, event.line, col, this, event.raw, 'The lang attribute value of <html> element must be a valid BCP47.');
                    }
                }
                else {
                    reporter.warn(this.id + '.absent', {}, event.line, col, this, event.raw, 'An lang attribute must be present on <html> elements.');
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1sYW5nLXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9odG1sLWxhbmctcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sT0FBTyxHQUNYLHFGQUFxRixDQUFBO0FBQ3ZGLE1BQU0sU0FBUyxHQUNiLDJJQUEySSxDQUFBO0FBQzdJLE1BQU0sYUFBYSxHQUFHLG9CQUFvQixTQUFTLElBQUksT0FBTyxHQUFHLENBQUE7QUFDakUsTUFBTSxVQUFVLEdBQUcsc0NBQXNDLENBQUE7QUFDekQsTUFBTSxXQUFXLEdBQUcsdUNBQXVDLENBQUE7QUFDM0QsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUE7QUFDckMsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLFNBQVMsdUJBQXVCLENBQUE7QUFDbEUsTUFBTSxPQUFPLEdBQUcsa0RBQWtELENBQUE7QUFDbEUsTUFBTSxNQUFNLEdBQUcsaUNBQWlDLENBQUE7QUFDaEQsTUFBTSxNQUFNLEdBQUcsd0JBQXdCLENBQUE7QUFDdkMsTUFBTSxPQUFPLEdBQUcsNENBQTRDLENBQUE7QUFDNUQsTUFBTSxRQUFRLEdBQUcsK0JBQStCLE9BQU8sZ0NBQWdDLENBQUE7QUFDdkYsTUFBTSxPQUFPLEdBQ1gsSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJO0lBQzNCLEtBQUssTUFBTSxJQUFJO0lBQ2YsS0FBSyxPQUFPLElBQUk7SUFDaEIsS0FBSyxTQUFTLElBQUk7SUFDbEIsS0FBSyxVQUFVLElBQUk7SUFDbkIsR0FBRyxDQUFBO0FBQ0wsTUFBTSxXQUFXLEdBQUcsSUFBSSxhQUFhLElBQUksT0FBTyxJQUFJLFdBQVcsR0FBRyxDQUFBO0FBRWxFLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQ1QsOEVBQThFO0lBQ2hGLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUMxQyxNQUFNLG1CQUFtQixHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUV4RCxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDckIsUUFBUSxDQUFDLElBQUksQ0FDWCxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsRUFDbEIsRUFBRSxFQUNGLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxFQUNULHlEQUF5RCxDQUMxRCxDQUFBO3FCQUNGO3lCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7d0JBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLEVBQ3BCLEVBQUUsRUFDRixLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCxtRUFBbUUsQ0FDcEUsQ0FBQTtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxRQUFRLENBQUMsSUFBSSxDQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxFQUNuQixFQUFFLEVBQ0YsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLEVBQ1QsdURBQXVELENBQ3hELENBQUE7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==