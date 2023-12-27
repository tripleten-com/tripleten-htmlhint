"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reporter {
    constructor(html, ruleset) {
        this.html = html;
        this.lines = html.split(/\r?\n/);
        const match = /\r?\n/.exec(html);
        this.brLen = match !== null ? match[0].length : 0;
        this.ruleset = ruleset;
        this.messages = [];
    }
    info(message, params, line, col, rule, raw, rawMessage) {
        this.report("info", message, params, line, col, rule, raw, rawMessage);
    }
    warn(message, params, line, col, rule, raw, rawMessage) {
        this.report("warning", message, params, line, col, rule, raw, rawMessage);
    }
    error(message, params, line, col, rule, raw, rawMessage) {
        this.report("error", message, params, line, col, rule, raw, rawMessage);
    }
    report(type, message, params, line, col, rule, raw, rawMessage) {
        const lines = this.lines;
        const brLen = this.brLen;
        let evidence = '';
        let evidenceLen = 0;
        for (let i = line - 1, lineCount = lines.length; i < lineCount; i++) {
            evidence = lines[i];
            evidenceLen = evidence.length;
            if (col > evidenceLen && line < lineCount) {
                line++;
                col -= evidenceLen;
                if (col !== 1) {
                    col -= brLen;
                }
            }
            else {
                break;
            }
        }
        this.messages.push({
            type: type,
            message: {
                id: message,
                values: params,
            },
            raw: raw,
            rawMessage: rawMessage || '',
            evidence: evidence,
            line: line,
            col: col,
            rule: {
                id: rule.id,
                description: rule.description,
                link: `https://htmlhint.com/docs/user-guide/rules/${rule.id}`,
            },
        });
    }
}
exports.default = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9yZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLE1BQXFCLFFBQVE7SUFPM0IsWUFBbUIsSUFBWSxFQUFFLE9BQWdCO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFTSxJQUFJLENBQ1QsT0FBZSxFQUNmLE1BQWtCLEVBQ2xCLElBQVksRUFDWixHQUFXLEVBQ1gsSUFBVSxFQUNWLEdBQVcsRUFDWCxVQUFtQjtRQUVuQixJQUFJLENBQUMsTUFBTSxTQUVULE9BQU8sRUFDUCxNQUFNLEVBQ04sSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILFVBQVUsQ0FDWCxDQUFBO0lBQ0gsQ0FBQztJQUVNLElBQUksQ0FDVCxPQUFlLEVBQ2YsTUFBa0IsRUFDbEIsSUFBWSxFQUNaLEdBQVcsRUFDWCxJQUFVLEVBQ1YsR0FBVyxFQUNYLFVBQW1CO1FBRW5CLElBQUksQ0FBQyxNQUFNLFlBRVQsT0FBTyxFQUNQLE1BQU0sRUFDTixJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDSixHQUFHLEVBQ0gsVUFBVSxDQUNYLENBQUE7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUNWLE9BQWUsRUFDZixNQUFrQixFQUNsQixJQUFZLEVBQ1osR0FBVyxFQUNYLElBQVUsRUFDVixHQUFXLEVBQ1gsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLE1BQU0sVUFFVCxPQUFPLEVBQ1AsTUFBTSxFQUNOLElBQUksRUFDSixHQUFHLEVBQ0gsSUFBSSxFQUNKLEdBQUcsRUFDSCxVQUFVLENBQ1gsQ0FBQTtJQUNILENBQUM7SUFFTyxNQUFNLENBQ1osSUFBZ0IsRUFDaEIsT0FBZSxFQUNmLE1BQWtCLEVBQ2xCLElBQVksRUFDWixHQUFXLEVBQ1gsSUFBVSxFQUNWLEdBQVcsRUFDWCxVQUFtQjtRQUVuQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDeEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFBO1lBQzdCLElBQUksR0FBRyxHQUFHLFdBQVcsSUFBSSxJQUFJLEdBQUcsU0FBUyxFQUFFO2dCQUN6QyxJQUFJLEVBQUUsQ0FBQTtnQkFDTixHQUFHLElBQUksV0FBVyxDQUFBO2dCQUNsQixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7b0JBQ2IsR0FBRyxJQUFJLEtBQUssQ0FBQTtpQkFDYjthQUNGO2lCQUFNO2dCQUNMLE1BQUs7YUFDTjtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsTUFBTSxFQUFFLE1BQU07YUFDZjtZQUNELEdBQUcsRUFBRSxHQUFHO1lBQ1IsVUFBVSxFQUFFLFVBQVUsSUFBSSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsSUFBSSxFQUFFLDhDQUE4QyxJQUFJLENBQUMsRUFBRSxFQUFFO2FBQ3REO1NBQ1YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBL0hELDJCQStIQyJ9