# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

### [0.6.1] - 2018-04-19

- Reduce package size by publishing only the `dist` folder

### [0.6.0] - 2018-03-22

- Use slate schema definition
- Upgrade to slate ^0.33.0

### [0.5.0] - 2017-11-08

- Upgrade to slate ^0.29.0

### [0.4.0] - 2017-09-19

- Upgrade to be compatible with Slate after the `expose-transform` branch went in.
- Change all instances of `transform` to `change`
- Change the namespace of `plugin.transforms` to `plugin.changes`

## [0.3.0] - 2017-09-11
- Update to slate 0.22.x

## [0.2.0] - 2016-11-30
- Update to slate 0.15.x
- Enforce blocks in blockquotes using schema

## [0.1.3] - 2016-11-03
- Move slate to `peerDependencies`

## [0.1.2] - 2016-09-30
- Now publish compiled source with babel

## [0.1.1] - 2016-09-19
- Use of this plugin with other container plugins (such as `slate-edit-list`)

## [0.1.0] - 2016-09-17
- First version
- Handle pressing enter in a blockquote
- Handle pressing backspace
- Provides utilities and transforms
