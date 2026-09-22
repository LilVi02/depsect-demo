// relnotes: prints release notes from a YAML file.
// A deliberately small app whose only purpose is to exercise real
// dependencies, so depsect has something realistic to bisect.
require('dotenv').config({ quiet: true });
const chalk = require('chalk');
const format = require('date-fns/format');
const ms = require('ms');
const semver = require('semver');
const _ = require('lodash');
const YAML = require('yaml');

function parseReleases(text) {
  const doc = YAML.parse(text);
  return _.orderBy(doc.releases, [(r) => semver.coerce(r.version).version], ['desc'])
    .sort((a, b) => semver.rcompare(a.version, b.version));
}

function renderRelease(release) {
  const title = chalk.bold(`v${release.version}`);
  const date = format(new Date(release.date), 'd MMM yyyy');
  const changes = _.map(release.changes, (c) => `  - ${c}`).join('\n');
  return `${title} (${date})\n${changes}`;
}

function sinceLabel(fromDate, toDate) {
  return `${ms(new Date(toDate) - new Date(fromDate), { long: true })} since previous release`;
}

module.exports = { parseReleases, renderRelease, sinceLabel };

if (require.main === module) {
  const text = require('fs').readFileSync(process.argv[2] || 'releases.yaml', 'utf8');
  console.log(parseReleases(text).map(renderRelease).join('\n\n'));
}
