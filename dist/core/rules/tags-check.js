"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let tagsTypings = {
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
};
exports.default = {
    id: 'tags-check',
    description: 'Checks html tags.',
    init(parser, reporter, options) {
        tagsTypings = Object.assign(Object.assign({}, tagsTypings), options);
        parser.addListener('tagstart', (event) => {
            const attrs = event.attrs;
            const col = event.col + event.tagName.length + 1;
            const tagName = event.tagName.toLowerCase();
            if (tagsTypings[tagName]) {
                const currentTagType = tagsTypings[tagName];
                if (currentTagType.selfclosing === true && !event.close) {
                    reporter.warn(this.id + '.selfclosing', { tagName }, event.line, event.col, this, event.raw, `The <${tagName}> tag must be selfclosing.`);
                }
                else if (currentTagType.selfclosing === false && event.close) {
                    reporter.warn(this.id + '.not-selfclosing', { tagName }, event.line, event.col, this, event.raw, `The <${tagName}> tag must not be selfclosing.`);
                }
                if (Array.isArray(currentTagType.attrsRequired)) {
                    const attrsRequired = currentTagType.attrsRequired;
                    attrsRequired.forEach((id) => {
                        if (Array.isArray(id)) {
                            const copyOfId = id.map((a) => a);
                            const realID = copyOfId.shift() || '';
                            const values = copyOfId;
                            if (attrs.some((attr) => attr.name === realID)) {
                                attrs.forEach((attr) => {
                                    if (attr.name === realID &&
                                        values.indexOf(attr.value) === -1) {
                                        reporter.error(this.id + '.attr-with-value', {
                                            tagName,
                                            attrName: realID,
                                            values: values.join(', '),
                                        }, event.line, col, this, event.raw, `The <${tagName}> tag must have attr '${realID}' with one value of '${values.join("' or '")}'.`);
                                    }
                                });
                            }
                            else {
                                reporter.error(this.id + '.attr-required', { tagName, attrName: realID }, event.line, col, this, event.raw, `The <${tagName}> tag must have attr '${realID}'.`);
                            }
                        }
                        else if (!attrs.some((attr) => id.split('|').indexOf(attr.name) !== -1)) {
                            reporter.error(this.id + '.attr-required', { tagName, attrName: id }, event.line, col, this, event.raw, `The <${tagName}> tag must have attr '${id}'.`);
                        }
                    });
                }
                if (Array.isArray(currentTagType.attrsOptional)) {
                    const attrsOptional = currentTagType.attrsOptional;
                    attrsOptional.forEach((id) => {
                        if (Array.isArray(id)) {
                            const copyOfId = id.map((a) => a);
                            const realID = copyOfId.shift();
                            const values = copyOfId;
                            if (attrs.some((attr) => attr.name === realID)) {
                                attrs.forEach((attr) => {
                                    if (attr.name === realID &&
                                        values.indexOf(attr.value) === -1) {
                                        reporter.error(this.id + '..optional-attr-with-values', {
                                            tagName,
                                            attrName: realID,
                                            values: values.join(', '),
                                        }, event.line, col, this, event.raw, `The <${tagName}> tag must have optional attr '${realID}' with one value of '${values.join("' or '")}'.`);
                                    }
                                });
                            }
                        }
                    });
                }
                if (Array.isArray(currentTagType.redundantAttrs)) {
                    const redundantAttrs = currentTagType.redundantAttrs;
                    redundantAttrs.forEach((attrName) => {
                        if (attrs.some((attr) => attr.name === attrName)) {
                            reporter.error(this.id + '.attr-is-redundant', { tagName, attrName }, event.line, col, this, event.raw, `The attr '${attrName}' is redundant for <${tagName}> and should be omitted.`);
                        }
                    });
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1jaGVjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3J1bGVzL3RhZ3MtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFJLFdBQVcsR0FBNEM7SUFDekQsQ0FBQyxFQUFFO1FBQ0QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUNoQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDeEI7SUFDRCxHQUFHLEVBQUU7UUFDSCxXQUFXLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUNELE1BQU0sRUFBRTtRQUNOLGFBQWEsRUFBRTtZQUNiLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUNsQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDbkI7S0FDRjtJQUNELEdBQUcsRUFBRTtRQUNILFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3ZDO0NBQ0YsQ0FBQTtBQUVELGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFlBQVk7SUFDaEIsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFnRDtRQUNyRSxXQUFXLG1DQUFRLFdBQVcsR0FBSyxPQUFPLENBQUUsQ0FBQTtRQUU1QyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDekIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFFaEQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUUzQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUUzQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDdkQsUUFBUSxDQUFDLElBQUksQ0FDWCxJQUFJLENBQUMsRUFBRSxHQUFHLGNBQWMsRUFDeEIsRUFBRSxPQUFPLEVBQUUsRUFDWCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLEVBQ1QsUUFBUSxPQUFPLDRCQUE0QixDQUM1QyxDQUFBO2lCQUNGO3FCQUFNLElBQUksY0FBYyxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDOUQsUUFBUSxDQUFDLElBQUksQ0FDWCxJQUFJLENBQUMsRUFBRSxHQUFHLGtCQUFrQixFQUM1QixFQUFFLE9BQU8sRUFBRSxFQUNYLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLEdBQUcsRUFDVCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCxRQUFRLE9BQU8sZ0NBQWdDLENBQ2hELENBQUE7aUJBQ0Y7Z0JBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDL0MsTUFBTSxhQUFhLEdBQ2pCLGNBQWMsQ0FBQyxhQUFhLENBQUE7b0JBQzlCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTt3QkFDM0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRCQUNyQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDakMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQTs0QkFDckMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFBOzRCQUV2QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEVBQUU7Z0NBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQ0FDckIsSUFDRSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07d0NBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNqQzt3Q0FDQSxRQUFRLENBQUMsS0FBSyxDQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLEVBQzVCOzRDQUNFLE9BQU87NENBQ1AsUUFBUSxFQUFFLE1BQU07NENBRWhCLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5Q0FFMUIsRUFDRCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCxRQUFRLE9BQU8seUJBQXlCLE1BQU0sd0JBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQy9FLFFBQVEsQ0FDVCxJQUFJLENBQ04sQ0FBQTtxQ0FDRjtnQ0FDSCxDQUFDLENBQUMsQ0FBQTs2QkFDSDtpQ0FBTTtnQ0FDTCxRQUFRLENBQUMsS0FBSyxDQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLEVBQzFCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFFN0IsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLEVBQ1QsUUFBUSxPQUFPLHlCQUF5QixNQUFNLElBQUksQ0FDbkQsQ0FBQTs2QkFDRjt5QkFDRjs2QkFBTSxJQUNMLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzlEOzRCQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsRUFDMUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUN6QixLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCxRQUFRLE9BQU8seUJBQXlCLEVBQUUsSUFBSSxDQUMvQyxDQUFBO3lCQUNGO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO2dCQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQy9DLE1BQU0sYUFBYSxHQUFlLGNBQWMsQ0FBQyxhQUFhLENBQUE7b0JBQzlELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTt3QkFDM0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRCQUNyQixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDakMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBOzRCQUMvQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUE7NEJBRXZCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsRUFBRTtnQ0FDOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29DQUNyQixJQUNFLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTt3Q0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ2pDO3dDQUNBLFFBQVEsQ0FBQyxLQUFLLENBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyw2QkFBNkIsRUFDdkM7NENBQ0UsT0FBTzs0Q0FDUCxRQUFRLEVBQUUsTUFBTTs0Q0FDaEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lDQUcxQixFQUNELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILElBQUksRUFDSixLQUFLLENBQUMsR0FBRyxFQUNULFFBQVEsT0FBTyxrQ0FBa0MsTUFBTSx3QkFBd0IsTUFBTSxDQUFDLElBQUksQ0FDeEYsUUFBUSxDQUNULElBQUksQ0FDTixDQUFBO3FDQUNGO2dDQUNILENBQUMsQ0FBQyxDQUFBOzZCQUNIO3lCQUNGO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO2dCQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7b0JBQ2hELE1BQU0sY0FBYyxHQUFhLGNBQWMsQ0FBQyxjQUFjLENBQUE7b0JBQzlELGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDbEMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxFQUFFOzRCQUNoRCxRQUFRLENBQUMsS0FBSyxDQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLEVBQzlCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUNyQixLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsRUFDVCxhQUFhLFFBQVEsdUJBQXVCLE9BQU8sMEJBQTBCLENBQzlFLENBQUE7eUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7aUJBQ0g7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==