export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write --parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write'],
  '*.{scss,css}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
}
