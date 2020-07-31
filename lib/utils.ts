import fs from 'fs';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'content');

export function getPostSlugs() {
  return fs.readdirSync(contentDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.json$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return JSON.parse(fileContents);
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug, fields));
}

export function slugify(string: string): string {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
