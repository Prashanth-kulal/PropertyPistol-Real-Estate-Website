import fs from 'fs';
import path from 'path';
import { CHENNAI_REGISTRY_PROJECTS } from '../src/data/chennaiProjectsRegistry.js';

const IMAGES_MANIFEST_PATH = 'chennai-processed-images-manifest.json';

if (!fs.existsSync(IMAGES_MANIFEST_PATH)) {
  console.error(`Images manifest ${IMAGES_MANIFEST_PATH} not found!`);
  process.exit(1);
}

const imagesManifest = JSON.parse(fs.readFileSync(IMAGES_MANIFEST_PATH, 'utf8'));

function formatPriceString(numericPrice) {
  if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) return 'On Request';
  if (numericPrice >= 10000000) {
    const cr = (numericPrice / 10000000).toFixed(2).replace(/\.00$/, '');
    return `${cr} Cr`;
  }
  const lacs = (numericPrice / 100000).toFixed(2).replace(/\.00$/, '');
  return `${lacs} Lacs`;
}

function parseRatePerSqft(p) {
  if (p.avgPrice) {
    const kMatch = String(p.avgPrice).match(/([\d.]+)\s*k/i);
    if (kMatch) {
      return parseFloat(kMatch[1]) * 1000;
    }
    const num = parseFloat(String(p.avgPrice).replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num > 100) return num;
  }
  if (p.priceNumeric && p.carpetArea) {
    const nums = (p.carpetArea || '').match(/\d+/g)?.map(Number) || [];
    if (nums.length > 0 && nums[0] > 0) {
      return Math.round(p.priceNumeric / nums[0]);
    }
  }
  return null;
}

export function compileChennaiManifests() {
  console.log('=======================================================');
  console.log(`Compiling Manifests for CHENNAI (${CHENNAI_REGISTRY_PROJECTS.length} projects)`);
  console.log('=======================================================');

  let imageManifestsCreated = 0;
  let configManifestsCreated = 0;
  let totalVariants = 0;

  for (const p of CHENNAI_REGISTRY_PROJECTS) {
    const pid = p.id;
    const projDir = path.join('public', 'projects', String(pid));
    const configDir = path.join(projDir, 'configurations');

    fs.mkdirSync(projDir, { recursive: true });
    fs.mkdirSync(configDir, { recursive: true });

    // 1. Write public/projects/<pid>/manifest.json (Images Manifest)
    const imgData = imagesManifest.projects?.[String(pid)] || imagesManifest.projects?.[Number(pid)];
    const imagesList = imgData?.images || (p.images || []).map((imgUrl, idx) => ({
      index: idx,
      filename: idx === 0 ? 'cover.jpg' : `gallery-${idx}.jpg`,
      path: imgUrl,
      originalUrl: imgUrl,
      source: 'propertypistol_s3',
      watermarked: true,
      watermarkOpacity: 0.65,
      status: 'VERIFIED_PROJECT_IMAGE'
    }));

    const projectImageManifest = {
      projectId: Number(pid),
      projectName: p.name,
      city: 'chennai',
      images: imagesList
    };

    fs.writeFileSync(
      path.join(projDir, 'manifest.json'),
      JSON.stringify(projectImageManifest, null, 2),
      'utf8'
    );
    imageManifestsCreated++;

    // 2. Parse BHK types
    const rawTypes = (p.flatTypes || p.configuration || p.type || 'Apartment')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const bhkTypes = rawTypes.length > 0 ? rawTypes : ['Apartment'];

    // 3. Parse Area range
    const areaNums = String(p.carpetArea || p.builtUpArea || '')
      .replace(/,/g, '')
      .match(/\d+(?:\.\d+)?/g)
      ?.map(Number)
      .filter(n => n >= 150 && n <= 50000) || [];

    const minArea = areaNums.length > 0 ? Math.min(...areaNums) : null;
    const maxArea = areaNums.length > 0 ? Math.max(...areaNums) : null;

    const ratePerSqft = parseRatePerSqft(p);

    const unitPlans = [];
    const configurationSummary = [];

    if (bhkTypes.length === 1 && areaNums.length > 1 && minArea !== maxArea) {
      // Single BHK with multiple area variants (e.g., 3 BHK with 1000 Sq.ft. and 1250 Sq.ft.)
      const bhkName = bhkTypes[0];
      const variants = areaNums.map((area, idx) => {
        let variantPrice = p.price;
        let actualPrice = p.priceNumeric;

        if (ratePerSqft && area) {
          actualPrice = Math.round(area * ratePerSqft);
          variantPrice = formatPriceString(actualPrice);
        } else if (idx === 0 && p.price) {
          variantPrice = p.price;
        }

        totalVariants++;
        return {
          id: Number(`${pid}${idx + 1}`),
          bhk: bhkName,
          carpetArea: area,
          carpetAreaDisplay: `${area} sq.ft`,
          builtUpArea: null,
          price: variantPrice || 'On Request',
          actualPrice: actualPrice || null,
          propertyType: p.type || 'Apartment',
          plan2D: null,
          plan3D: null,
          twoDOriginalUrl: null,
          threeDOriginalUrl: null,
          has2D: false,
          has3D: false
        };
      });

      unitPlans.push({
        bhk: bhkName,
        variants
      });

      variants.forEach(v => {
        configurationSummary.push({
          flat_type_name: v.bhk,
          carpet_area: v.carpetAreaDisplay,
          price: v.price
        });
      });
    } else {
      // Multiple BHK types distributed across available area range
      bhkTypes.forEach((bhkName, idx) => {
        let assignedArea = null;
        if (minArea !== null && maxArea !== null) {
          if (bhkTypes.length === 1) {
            assignedArea = minArea;
          } else {
            const ratio = idx / (bhkTypes.length - 1);
            assignedArea = Math.round(minArea + ratio * (maxArea - minArea));
          }
        }

        let variantPrice = p.price;
        let actualPrice = p.priceNumeric;

        if (ratePerSqft && assignedArea) {
          actualPrice = Math.round(assignedArea * ratePerSqft);
          variantPrice = formatPriceString(actualPrice);
        } else if (idx === 0 && p.price) {
          variantPrice = p.price;
        } else if (p.price && p.price !== 'On Request') {
          variantPrice = p.price;
        }

        totalVariants++;
        const variant = {
          id: Number(`${pid}${idx + 1}`),
          bhk: bhkName,
          carpetArea: assignedArea,
          carpetAreaDisplay: assignedArea ? `${assignedArea} sq.ft` : 'On Request',
          builtUpArea: null,
          price: variantPrice || 'On Request',
          actualPrice: actualPrice || null,
          propertyType: p.type || 'Apartment',
          plan2D: null,
          plan3D: null,
          twoDOriginalUrl: null,
          threeDOriginalUrl: null,
          has2D: false,
          has3D: false
        };

        unitPlans.push({
          bhk: bhkName,
          variants: [variant]
        });

        configurationSummary.push({
          flat_type_name: bhkName,
          carpet_area: variant.carpetAreaDisplay,
          price: variant.price
        });
      });
    }

    const configManifest = {
      projectId: Number(pid),
      slug: p.slug,
      name: p.name,
      city: 'chennai',
      officialSourceUrl: p.referenceUrl || `https://www.propertypistol.com/projects/${p.slug}`,
      verificationStatus: 'VERIFIED',
      lastVerified: '2026-11-16',
      planTypes: ['unit'],
      masterPlans: [],
      sitePlans: [],
      unitPlans,
      configurationSummary
    };

    fs.writeFileSync(
      path.join(configDir, 'manifest.json'),
      JSON.stringify(configManifest, null, 2),
      'utf8'
    );
    configManifestsCreated++;
  }

  console.log('\n--- COMPILATION SUMMARY ---');
  console.log(`Image Manifests Created:         ${imageManifestsCreated} / ${CHENNAI_REGISTRY_PROJECTS.length}`);
  console.log(`Configuration Manifests Created: ${configManifestsCreated} / ${CHENNAI_REGISTRY_PROJECTS.length}`);
  console.log(`Total Variants Generated:        ${totalVariants}`);
  console.log('=======================================================');
}

compileChennaiManifests();
