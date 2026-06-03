## ADDED Requirements

### Requirement: Generator script shall discover skill directories
The system SHALL scan the `.trae/skills/` directory and find all subdirectories containing a `SKILL.md` file.

#### Scenario: Discovers all skill directories
- **WHEN** script runs
- **THEN** it SHALL find all directories in `.trae/skills/` that contain `SKILL.md`

#### Scenario: Ignores non-skill directories
- **WHEN** script runs
- **THEN** it SHALL skip any directory that does not contain `SKILL.md`

### Requirement: Generator script shall parse skill metadata
The system SHALL read each `SKILL.md` file and extract the `name` and `description` from frontmatter.

#### Scenario: Parses valid frontmatter
- **WHEN** SKILL.md has valid frontmatter with name and description
- **THEN** the script SHALL extract both fields correctly

#### Scenario: Handles missing frontmatter gracefully
- **WHEN** SKILL.md has malformed or missing frontmatter
- **THEN** the script SHALL log a warning and skip that file

### Requirement: Generator script shall output valid HTML
The system SHALL generate an `index.html` file in `.trae/skills/` directory with all discovered skills rendered as cards.

#### Scenario: Generates HTML with all skills
- **WHEN** script completes successfully
- **THEN** the output HTML SHALL contain a card for each discovered skill

#### Scenario: Card contains name, description, and link
- **WHEN** a skill card is rendered
- **THEN** it SHALL display the skill name, description, and a link to the skill's SKILL.md file

### Requirement: Generator script shall be runnable via npm
The system SHALL allow execution via `npm run generate:skill-index`.

#### Scenario: npm script exists
- **WHEN** user runs `npm run generate:skill-index`
- **THEN** the generator script SHALL execute

#### Scenario: Script completes without errors
- **WHEN** all SKILL.md files are valid
- **THEN** the script SHALL complete with exit code 0
