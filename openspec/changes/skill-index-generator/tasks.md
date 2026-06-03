## 1. Create generator script

- [x] 1.1 Create `scripts/generate-skill-index.mjs` file
- [x] 1.2 Implement directory scanning logic (fs.readdirSync)
- [x] 1.3 Implement frontmatter parsing (regex-based)
- [x] 1.4 Add error handling for missing/invalid SKILL.md files

## 2. Generate HTML output

- [x] 2.1 Inline HTML template with CSS variables (from existing index.html)
- [x] 2.2 Generate skill cards dynamically
- [x] 2.3 Write output to `.trae/skills/index.html`

## 3. Add npm script

- [x] 3.1 Read existing `package.json`
- [x] 3.2 Add `"generate:skill-index": "node scripts/generate-skill-index.mjs"` script
- [x] 3.3 Run the script to regenerate index.html
