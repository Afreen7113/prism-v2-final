const fs = require('fs');
const lines = fs.readFileSync('scratch_classes.txt', 'utf8').split('\n');

let report = '## DEFAULT THEME & GLOBAL HOVER LEAK AUDIT\n\n';
report += '### PROBLEM 1: Root Cause Investigation\n\n';
report += '1. **Which theme is active on initial page load:** The hardcoded `defaultTheme` state object.\n';
report += '2. **Where the default theme is being assigned:** During SSR and initial state initialization in `providers/ThemeProvider.tsx`.\n';
report += '3. **Whether localStorage, ThemeProvider, cookies, or fallback logic are forcing a hidden/default preset:** `ThemeProvider` forces the initial React state to `defaultTheme` before `useIsomorphicLayoutEffect` has a chance to read `localStorage` or system preferences on the client.\n';
report += '4. **Which preset is responsible for the purple appearance:** The `defaultTheme` object itself is hardcoded with `var(--color-indigo-500)` as the `primaryColor`, causing the purple/indigo leak before the active preset is applied.\n';
report += '5. **Exact file and line number:** `providers/ThemeProvider.tsx`, lines 33-54 (definition) and line 207 (initial state assignment).\n\n';

report += '### PROBLEM 2: Global Hover Leak Audit\n\n';

const leakRegex = /hover:(bg|text|border|shadow)-(indigo|violet)(-\d+)?|(bg|text|border|shadow)-brand(\/\d+)?|from-(indigo|violet)(-\d+)?|to-(indigo|violet)(-\d+)?/g;

let count = 0;
for (let line of lines) {
    if (line.charCodeAt(0) === 0xFEFF) {
        line = line.substring(1);
    }
    if (!line.trim()) continue;
    
    const parts = line.split(':');
    if (parts.length < 4) continue;
    
    const file = parts[0] + ':' + parts[1];
    const lineNumber = parts[2];
    const content = parts.slice(3).join(':');
    
    // Use path module or simple split to get relative path
    const pathParts = file.split('prism-v2-main\\');
    const cleanFile = pathParts.length > 1 ? pathParts[1].replace(/\\/g, '/') : file;
    
    // Find all matching classes
    const classes = content.match(leakRegex);
    if (!classes) continue;
    
    const uniqueClasses = [...new Set(classes)];
    
    for (const cls of uniqueClasses) {
        const isBrand = cls.includes('brand');
        const classification = isBrand ? 'SAFE TOKENIZED' : 'HARDCODED THEME LEAK';
        const changesCorrectly = isBrand ? 'Yes' : 'No';
        
        report += `* **File path**: \`${cleanFile.trim()}\`\n`;
        report += `* **Line number**: \`${lineNumber}\`\n`;
        report += `* **Exact class**: \`${cls}\`\n`;
        report += `* **Changes correctly with theme change**: ${changesCorrectly}\n`;
        report += `* **Tokenized or hardcoded**: ${isBrand ? 'Tokenized' : 'Hardcoded'}\n`;
        report += `* **Classification**: **${classification}**\n\n`;
        count++;
    }
}

fs.writeFileSync('audit_report.txt', report);
console.log('Done, count:', count);
