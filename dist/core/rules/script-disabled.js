"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'script-disabled',
    description: 'The <script> tag cannot be used.',
    init(parser, reporter) {
        parser.addListener('tagstart', (event) => {
            if (event.tagName.toLowerCase() === 'script') {
                reporter.error(this.id, {}, event.line, event.col, this, event.raw, 'The <script> tag cannot be used.');
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWRpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcnVsZXMvc2NyaXB0LWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLFdBQVcsRUFBRSxrQ0FBa0M7SUFDL0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ25CLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDNUMsUUFBUSxDQUFDLEtBQUssQ0FDWixJQUFJLENBQUMsRUFBRSxFQUNQLEVBQUUsRUFDRixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxHQUFHLEVBQ1QsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLEVBQ1Qsa0NBQWtDLENBQ25DLENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==