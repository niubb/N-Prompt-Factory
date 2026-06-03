## ADDED Requirements

### Requirement: Regenerate skill shall execute index generator
The system SHALL provide a skill that triggers the regeneration of the skills index HTML page.

#### Scenario: Skill is invoked
- **WHEN** user triggers the regenerate-skill-index skill
- **THEN** the system SHALL execute `npm run generate:skill-index`

#### Scenario: Generator completes successfully
- **WHEN** `npm run generate:skill-index` completes with exit code 0
- **THEN** the `.trae/skills/index.html` file SHALL be updated with current skills data

#### Scenario: Generator fails
- **WHEN** `npm run generate:skill-index` fails
- **THEN** the skill SHALL report the error to the user
