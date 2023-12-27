"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'title-require',
    description: '<title> must be present in <head> tag.',
    init(parser, reporter) {
        let headBegin = false;
        let hasTitle = false;
        const onTagStart = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
            }
        };
        const onTagEnd = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                const lastEvent = event.lastEvent;
                if (lastEvent.type !== 'text' ||
                    (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
                    reporter.error(this.id + '.empty', {}, event.line, event.col, this, event.raw, '<title></title> must not be empty.');
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error(this.id + '.head', {}, event.line, event.col, this, event.raw, '<title> must be present in <head> tag.');
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtcmVxdWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RpdGxlLXJlcXVpcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZTtJQUNiLEVBQUUsRUFBRSxlQUFlO0lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7SUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFFcEIsTUFBTSxVQUFVLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQTthQUNqQjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksU0FBUyxFQUFFO2dCQUMzQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxRQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNDLElBQUksUUFBUSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBR25DLE1BQU0sU0FBUyxHQUFVLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBQ3hDLElBQ0UsU0FBUyxDQUFDLElBQUksS0FBSyxNQUFNO29CQUN6QixDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUNuRTtvQkFDQSxRQUFRLENBQUMsS0FBSyxDQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxFQUNsQixFQUFFLEVBQ0YsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsR0FBRyxFQUNULElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxFQUNULG9DQUFvQyxDQUNyQyxDQUFBO2lCQUNGO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUM3QixJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7b0JBQ3RCLFFBQVEsQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQ2pCLEVBQUUsRUFDRixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLEVBQ1Qsd0NBQXdDLENBQ3pDLENBQUE7aUJBQ0Y7Z0JBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNNLENBQUEifQ==