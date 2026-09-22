const test = require('node:test');
const assert = require('node:assert/strict');
const { parseReleases, renderRelease, sinceLabel } = require('../src/index.js');

const YAML_TEXT = `
releases:
  - version: 1.2.0
    date: 2026-03-01
    changes: [Faster startup]
  - version: 1.10.0
    date: 2026-06-15
    changes: [New output format, Bug fixes]
  - version: 1.9.3
    date: 2026-05-02
    changes: [Security fix]
`;

test('orders releases by semver, not alphabetically', () => {
  assert.deepEqual(parseReleases(YAML_TEXT).map((r) => r.version), ['1.10.0', '1.9.3', '1.2.0']);
});

test('renders a release', () => {
  const [latest] = parseReleases(YAML_TEXT);
  assert.equal(renderRelease(latest), 'v1.10.0 (15 Jun 2026)\n  - New output format\n  - Bug fixes');
});

test('describes the gap between releases', () => {
  assert.equal(sinceLabel('2026-05-02', '2026-05-09'), '7 days since previous release');
});
