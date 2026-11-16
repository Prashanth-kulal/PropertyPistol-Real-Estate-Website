import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch/stage_a_configs.json', 'utf8'));

const content = `// Verified Mumbai Projects Configurations Store
// Grounded in official PropertyPistol project records.
// Maps project IDs and slugs to verified unit plans, area variants, master plans, and site plans.

export const MUMBAI_CONFIGURATIONS = ${JSON.stringify(raw, null, 2)};
`;

fs.writeFileSync('src/data/configurations/mumbaiConfigurations.js', content, 'utf8');
console.log(`Updated src/data/configurations/mumbaiConfigurations.js with ${Object.keys(raw).length} projects.`);
