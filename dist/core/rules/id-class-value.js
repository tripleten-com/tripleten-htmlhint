"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'id-class-value',
    description: 'The id and class attribute values must meet the specified rules.',
    init(parser, reporter, options) {
        const arrRules = {
            underline: {
                regId: /^[a-z\d]+(_[a-z\d]+)*$/,
                message: 'The id and class attribute values must be in lowercase and split by an underscore.',
            },
            dash: {
                regId: /^[a-z\d]+(-[a-z\d]+)*$/,
                message: 'The id and class attribute values must be in lowercase and split by a dash.',
            },
            hump: {
                regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                message: 'The id and class attribute values must meet the camelCase style.',
            },
        };
        let rule;
        let opts = options;
        if (typeof options === 'string') {
            rule = arrRules[options];
        }
        else {
            opts = '';
            rule = options;
        }
        if (typeof rule === 'object' && rule.regId) {
            let regId = rule.regId;
            const message = rule.message;
            if (!(regId instanceof RegExp)) {
                regId = new RegExp(regId);
            }
            console.log(JSON.stringify(rule));
            console.log(JSON.stringify(opts));
            parser.addListener('tagstart', (event) => {
                const attrs = event.attrs;
                let attr;
                const col = event.col + event.tagName.length + 1;
                for (let i = 0, l1 = attrs.length; i < l1; i++) {
                    attr = attrs[i];
                    if (attr.name.toLowerCase() === 'id') {
                        if (regId.test(attr.value) === false) {
                            reporter.warn(`${this.id}.${opts}`, {}, event.line, col + attr.index, this, attr.raw, message);
                        }
                    }
                    if (attr.name.toLowerCase() === 'class') {
                        const arrClass = attr.value.split(/\s+/g);
                        let classValue;
                        for (let j = 0, l2 = arrClass.length; j < l2; j++) {
                            classValue = arrClass[j];
                            if (classValue && regId.test(classValue) === false) {
                                reporter.warn(`${this.id}.${opts}`, {}, event.line, col + attr.index, this, classValue, message);
                            }
                        }
                    }
                }
            });
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtY2xhc3MtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9pZC1jbGFzcy12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1Qsa0VBQWtFO0lBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDNUIsTUFBTSxRQUFRLEdBQTZEO1lBQ3pFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixPQUFPLEVBQ0wsb0ZBQW9GO2FBQ3ZGO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLE9BQU8sRUFDTCw2RUFBNkU7YUFDaEY7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHVDQUF1QztnQkFDOUMsT0FBTyxFQUNMLGtFQUFrRTthQUNyRTtTQUNGLENBQUE7UUFDRCxJQUFJLElBQWtELENBQUE7UUFDdEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ2xCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDekI7YUFBTTtZQUNMLElBQUksR0FBRyxFQUFFLENBQUE7WUFDVCxJQUFJLEdBQUcsT0FBNkMsQ0FBQTtTQUNyRDtRQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBRTVCLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxNQUFNLENBQUMsRUFBRTtnQkFDOUIsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQzFCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFFakMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtnQkFDekIsSUFBSSxJQUFJLENBQUE7Z0JBQ1IsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBRWYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTt3QkFDcEMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7NEJBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRSxFQUNwQixFQUFFLEVBQ0YsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxHQUFHLEVBQ1IsT0FBTyxDQUNSLENBQUE7eUJBQ0Y7cUJBQ0Y7b0JBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTt3QkFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ3pDLElBQUksVUFBVSxDQUFBO3dCQUVkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ2pELFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQ3hCLElBQUksVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFO2dDQUNsRCxRQUFRLENBQUMsSUFBSSxDQUNYLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFDcEIsRUFBRSxFQUNGLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2hCLElBQUksRUFDSixVQUFVLEVBQ1YsT0FBTyxDQUNSLENBQUE7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztDQUNNLENBQUEifQ==