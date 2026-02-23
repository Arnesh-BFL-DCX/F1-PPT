import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

/**
 * Read and parse a slide YAML file from data/slides/{name}.yaml.
 * Server-side only — call from Server Components or generateStaticParams.
 */
export function getSlideData<T>(name: string): T {
  const filePath = path.join(process.cwd(), 'data', 'slides', `${name}.yaml`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return parse(raw) as T;
}
