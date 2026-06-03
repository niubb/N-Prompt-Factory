import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const skillsDir = path.join(rootDir, '.trae', 'skills');
const outputFile = path.join(skillsDir, 'index.html');

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skills Index</title>
  <style>
    :root {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --bg-card: #0f3460;
      --text-primary: #eaeaea;
      --text-secondary: #a0a0a0;
      --accent: #e94560;
      --accent-hover: #ff6b6b;
      --border-radius: 12px;
      --spacing: 20px;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      min-height: 100vh;
      padding: var(--spacing);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      padding: 40px 0;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, var(--accent), var(--accent-hover));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--spacing);
      padding: var(--spacing) 0;
    }

    .skill-card {
      background: var(--bg-card);
      border-radius: var(--border-radius);
      padding: var(--spacing);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      border: 1px solid transparent;
    }

    .skill-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(233, 69, 96, 0.2);
      border-color: var(--accent);
    }

    .skill-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 10px;
      font-family: 'Consolas', 'Monaco', monospace;
    }

    .skill-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      flex-grow: 1;
    }

    .skill-link {
      margin-top: 15px;
      color: var(--accent);
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .skill-card:hover .skill-link {
      color: var(--accent-hover);
    }

    .skill-link::after {
      content: '→';
      transition: transform 0.2s ease;
    }

    .skill-card:hover .skill-link::after {
      transform: translateX(4px);
    }

    footer {
      text-align: center;
      padding: 40px 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }

      body {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Skills Index</h1>
      <p class="subtitle">Available AI Skills for Trae IDE</p>
    </header>

    <div class="skills-grid">
{{SKILLS_CARDS}}
    </div>

    <footer>
      <p>Total: {{TOTAL}} skills</p>
    </footer>
  </div>
</body>
</html>
`;

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
        return null;
    }

    const frontmatter = match[1];
    const nameMatch = frontmatter.match(/name:\s*["']?([^"'\n]+)["']?/);
    const descMatch = frontmatter.match(/description:\s*(?:"([^"]+)"|'([^']+)'|([^"\n][^\n]*))/);

    if (!nameMatch) {
        return null;
    }

    const description = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3] || '').trim() : '';

    if (!description) {
        return null;
    }

    return {
        name: nameMatch[1].trim(),
        description
    };
}

function discoverSkills() {
    const skills = [];

    if (!fs.existsSync(skillsDir)) {
        console.warn(`Skills directory not found: ${skillsDir}`);
        return skills;
    }

    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const skillPath = path.join(skillsDir, entry.name, 'SKILL.md');

        if (!fs.existsSync(skillPath)) {
            console.warn(`SKILL.md not found in ${entry.name}, skipping.`);
            continue;
        }

        try {
            const content = fs.readFileSync(skillPath, 'utf-8');
            const metadata = parseFrontmatter(content);

            if (!metadata) {
                console.warn(`Failed to parse frontmatter in ${entry.name}/SKILL.md, skipping.`);
                continue;
            }

            skills.push({
                name: metadata.name,
                description: metadata.description,
                href: `${entry.name}/SKILL.md`
            });
        } catch (err) {
            console.warn(`Error reading ${entry.name}/SKILL.md: ${err.message}`);
        }
    }

    return skills;
}

function generateSkillCard(skill) {
    return `      <a href="${skill.href}" class="skill-card">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-description">${skill.description}</div>
        <div class="skill-link">View Skill</div>
      </a>`;
}

function generateHTML(skills) {
    const cards = skills.map(generateSkillCard).join('\n');
    return HTML_TEMPLATE
        .replace('{{SKILLS_CARDS}}', cards)
        .replace('{{TOTAL}}', skills.length.toString());
}

function main() {
    console.log('Discovering skills...');
    const skills = discoverSkills();
    console.log(`Found ${skills.length} skills.`);

    console.log('Generating HTML...');
    const html = generateHTML(skills);

    fs.writeFileSync(outputFile, html, 'utf-8');
    console.log(`Written to ${outputFile}`);
}

main();
