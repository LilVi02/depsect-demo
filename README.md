# depsect demo

A small Node app used to demonstrate [depsect](https://github.com/LilVi02/depsect).

The open pull request simulates a grouped Dependabot update that bumps 7 real npm packages at once and breaks the tests. The `depsect` workflow bisects the update and comments with the packages responsible and the updates that are safe to merge.
