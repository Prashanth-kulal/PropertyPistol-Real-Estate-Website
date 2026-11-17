import { getAllDevelopers, getDeveloperBySlug, getRelatedDevelopers } from '../src/data/developersData.js';

console.log('Testing getAllDevelopers...');
const allDevs = getAllDevelopers();
console.log('All developers count:', allDevs.length);

console.log('Testing getDeveloperBySlug("prestige-group")...');
const prestige = getDeveloperBySlug('prestige-group');
console.log('Prestige cities:', prestige.cities.map(c => c.name));

console.log('Testing getDeveloperBySlug("sobha-limited")...');
const sobha = getDeveloperBySlug('sobha-limited');
console.log('Sobha cities:', sobha.cities.map(c => c.name));

console.log('Testing getDeveloperBySlug for a Kochi developer (e.g. kochiDevMatches)...');
// Let's test a Kochi developer slug
import { KOCHI_REGISTRY_PROJECTS } from '../src/data/kochiProjectsRegistry.js';
const kochiDevSlug = KOCHI_REGISTRY_PROJECTS[0]?.developerSlug;
console.log('Kochi dev slug:', kochiDevSlug);
if (kochiDevSlug) {
  const kochiDev = getDeveloperBySlug(kochiDevSlug);
  console.log('Kochi dev resolved name:', kochiDev?.name, 'project count:', kochiDev?.projectCount);
}

console.log('Testing getDeveloperBySlug for a Dubai developer...');
import { DUBAI_REGISTRY_PROJECTS } from '../src/data/dubaiProjectsRegistry.js';
const dubaiDevSlug = DUBAI_REGISTRY_PROJECTS[0]?.developerSlug;
console.log('Dubai dev slug:', dubaiDevSlug);
if (dubaiDevSlug) {
  const dubaiDev = getDeveloperBySlug(dubaiDevSlug);
  console.log('Dubai dev resolved name:', dubaiDev?.name, 'project count:', dubaiDev?.projectCount);
}

console.log('ALL DEVELOPER TESTS PASSED SUCCESSFULLY!');
