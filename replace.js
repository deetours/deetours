const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if(fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) results.push(fullPath);
        }
    });
    return results;
}

const files = [...walk('app'), ...walk('components')];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Hex Erasure
    content = content.replace(/bg-\[#0A0A0A\](\/[0-9]+)?/g, (m, op) => op ? 'bg-background' + op : 'bg-background');
    content = content.replace(/text-\[#0A0A0A\](\/[0-9]+)?/g, (m, op) => op ? 'text-background' + op : 'text-background');
    content = content.replace(/border-\[#0A0A0A\](\/[0-9]+)?/g, (m, op) => op ? 'border-background' + op : 'border-background');
    
    content = content.replace(/bg-\[#FAFAFA\](\/[0-9]+)?/g, (m, op) => op ? 'bg-foreground' + op : 'bg-foreground');
    content = content.replace(/text-\[#FAFAFA\](\/[0-9]+)?/g, (m, op) => op ? 'text-foreground' + op : 'text-foreground');
    content = content.replace(/border-\[#FAFAFA\](\/[0-9]+)?/g, (m, op) => op ? 'border-foreground' + op : 'border-foreground');

    content = content.replace(/bg-\[#111\](\/[0-9]+)?/g, (m, op) => op ? 'bg-surface-1' + op : 'bg-surface-1');
    content = content.replace(/text-\[#111\](\/[0-9]+)?/g, (m, op) => op ? 'text-surface-1' + op : 'text-surface-1');
    content = content.replace(/border-\[#111\](\/[0-9]+)?/g, (m, op) => op ? 'border-surface-1' + op : 'border-surface-1');

    content = content.replace(/bg-\[#333\](\/[0-9]+)?/g, (m, op) => op ? 'bg-border-subtle' + op : 'bg-border-subtle');
    content = content.replace(/border-\[#333\](\/[0-9]+)?/g, (m, op) => op ? 'border-border-subtle' + op : 'border-border-subtle');
    content = content.replace(/text-\[#333\](\/[0-9]+)?/g, (m, op) => op ? 'text-border-subtle' + op : 'text-border-subtle');

    content = content.replace(/text-\[#737373\](\/[0-9]+)?/g, (m, op) => op ? 'text-muted' + op : 'text-muted');
    content = content.replace(/border-\[#737373\](\/[0-9]+)?/g, (m, op) => op ? 'border-muted' + op : 'border-muted');
    
    content = content.replace(/text-\[#A3A3A3\](\/[0-9]+)?/g, (m, op) => op ? 'text-border-strong' + op : 'text-border-strong');
    content = content.replace(/border-\[#A3A3A3\](\/[0-9]+)?/g, (m, op) => op ? 'border-border-strong' + op : 'border-border-strong');
    
    content = content.replace(/from-\[#0A0A0A\](\/[0-9]+)?/g, (m, op) => op ? 'from-background' + op : 'from-background');
    content = content.replace(/to-\[#0A0A0A\](\/[0-9]+)?/g, (m, op) => op ? 'to-background' + op : 'to-background');
    content = content.replace(/from-\[#111\](\/[0-9]+)?/g, (m, op) => op ? 'from-surface-1' + op : 'from-surface-1');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Hex replacement complete.');
