"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'inline-script-disabled',
    description: 'Inline script cannot be used.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            let attr;
            const col = event.col + event.tagName.length + 1;
            let attrName;
            const reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
            for (let i = 0, l = attrs.length; i < l; i++) {
                attr = attrs[i];
                attrName = attr.name.toLowerCase();
                if (reEvent.test(attrName) === true) {
                    reporter.warn(this.id, { attrRaw: attr.raw }, event.line, col + attr.index, this, attr.raw, `Inline script [ ${attr.raw} ] cannot be used.`);
                }
                else if (attrName === 'src' || attrName === 'href') {
                    if (/^\s*javascript:/i.test(attr.value)) {
                        reporter.warn(this.id, { attrRaw: attr.raw }, event.line, col + attr.index, this, attr.raw, `Inline script [ ${attr.raw} ] cannot be used.`);
                    }
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXNjcmlwdC1kaXNhYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL2lubGluZS1zY3JpcHQtZGlzYWJsZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSx3QkFBd0I7SUFDNUIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQ3pCLElBQUksSUFBSSxDQUFBO1lBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFDaEQsSUFBSSxRQUFRLENBQUE7WUFDWixNQUFNLE9BQU8sR0FDWCxtTEFBbUwsQ0FBQTtZQUVyTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUVsQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNuQyxRQUFRLENBQUMsSUFBSSxDQUNYLElBQUksQ0FBQyxFQUFFLEVBQ1AsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUNyQixLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLEdBQUcsRUFDUixtQkFBbUIsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQ2hELENBQUE7aUJBQ0Y7cUJBQU0sSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQUU7b0JBQ3BELElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDdkMsUUFBUSxDQUFDLElBQUksQ0FDWCxJQUFJLENBQUMsRUFBRSxFQUNQLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFDckIsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLEVBQ1IsbUJBQW1CLElBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUNoRCxDQUFBO3FCQUNGO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDTSxDQUFBIn0=