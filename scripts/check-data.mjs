// Validates public/resumeData.json against schema/resumeData.schema.json.
// Runs before every build so a typo fails loudly instead of rendering nothing.
import { readFileSync } from 'node:fs';
import Ajv from 'ajv';

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const schema = read('schema/resumeData.schema.json');
const data = read('public/resumeData.json');

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const errors = validate(data)
  ? []
  : validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? `: "${e.params.additionalProperty}"` : ''}`);

// Checks JSON Schema can't express.
const slugs = (data.resume?.projects ?? []).map((p) => p.slug);
slugs.filter((s, i) => slugs.indexOf(s) !== i).forEach((s) => errors.push(`/resume/projects duplicate slug "${s}"`));

if (errors.length) {
  console.error('resumeData.json is invalid:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('resumeData.json OK');
