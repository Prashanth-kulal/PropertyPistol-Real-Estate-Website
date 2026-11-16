import fs from 'fs';
import path from 'path';

import { MUMBAI_REGISTRY_PROJECTS } from '../src/data/mumbaiProjectsRegistry.js';
import { PUNE_REGISTRY_PROJECTS } from '../src/data/puneProjectsRegistry.js';
import { BANGALORE_REGISTRY_PROJECTS } from '../src/data/bangaloreProjectsRegistry.js';
import { HYDERABAD_REGISTRY_PROJECTS } from '../src/data/hyderabadProjectsRegistry.js';
import { DELHI_REGISTRY_PROJECTS } from '../src/data/delhiProjectsRegistry.js';
import { NOIDA_REGISTRY_PROJECTS } from '../src/data/noidaProjectsRegistry.js';
import { GOA_REGISTRY_PROJECTS } from '../src/data/goaProjectsRegistry.js';
import { NAGPUR_REGISTRY_PROJECTS } from '../src/data/nagpurProjectsRegistry.js';
import { COIMBATORE_REGISTRY_PROJECTS } from '../src/data/coimbatoreProjectsRegistry.js';
import { CHENNAI_REGISTRY_PROJECTS } from '../src/data/chennaiProjectsRegistry.js';

console.log('Extracting top genuine projects for homepage carousel...');

const topMumbai = MUMBAI_REGISTRY_PROJECTS.slice(0, 16);
const topPune = PUNE_REGISTRY_PROJECTS.slice(0, 16);
const topBangalore = BANGALORE_REGISTRY_PROJECTS.slice(0, 16);
const topHyderabad = HYDERABAD_REGISTRY_PROJECTS.slice(0, 16);
const topDelhi = DELHI_REGISTRY_PROJECTS.slice(0, 16);
const topNoida = NOIDA_REGISTRY_PROJECTS.slice(0, 16);
const topGoa = GOA_REGISTRY_PROJECTS.slice(0, 16);
const topNagpur = NAGPUR_REGISTRY_PROJECTS.slice(0, 16);
const topCoimbatore = COIMBATORE_REGISTRY_PROJECTS.slice(0, 16);
const topChennai = CHENNAI_REGISTRY_PROJECTS.slice(0, 16);

const topProjects = [
  ...topMumbai,
  ...topPune,
  ...topBangalore,
  ...topHyderabad,
  ...topDelhi,
  ...topNoida,
  ...topGoa,
  ...topNagpur,
  ...topCoimbatore,
  ...topChennai,
];

const fileContent = `// Pre-selected verified top projects for homepage showcase
// Lightweight dataset (avoids bundling 34+ MB of entire city registries into the homepage)
export const TOP_PROJECTS = ${JSON.stringify(topProjects, null, 2)};
`;

fs.writeFileSync('src/data/topProjects.js', fileContent, 'utf8');
const stat = fs.statSync('src/data/topProjects.js');
console.log(`Generated src/data/topProjects.js: ${(stat.size / 1024).toFixed(1)} KB with ${topProjects.length} top projects.`);
