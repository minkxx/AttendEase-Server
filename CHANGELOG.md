# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/monsurcodes/AttendEase-Server/compare/v0.2.0...v0.2.1) (2026-06-13)


### Features

* add better-auth packages ([e9c99aa](https://github.com/monsurcodes/AttendEase-Server/commit/e9c99aa3e3a88ebfff2d853d05b402d34e85c680))
* add better-auth tables ([4211aa0](https://github.com/monsurcodes/AttendEase-Server/commit/4211aa06bcf07fee0eabdcc29394ca4016cad620))
* add clean:info script with rimraf to fix server build error ([e398527](https://github.com/monsurcodes/AttendEase-Server/commit/e3985277af5cb6e43e9384b11160c7178bf8635c))
* better-auth config file ([1dfe4ec](https://github.com/monsurcodes/AttendEase-Server/commit/1dfe4ecd289340355426314a6fd4f3b5d3490d9d))
* disbale bodyParser for better-auth to work ([136d67b](https://github.com/monsurcodes/AttendEase-Server/commit/136d67bfa5ac70c050446b8d76c46e2ef4c2ba30))
* replace jwt config with better-auth config ([616cc11](https://github.com/monsurcodes/AttendEase-Server/commit/616cc11eb091ef9bc1f5e5c541aa0ab5fe0ff420))

## [0.2.0](https://github.com/monsurcodes/AttendEase-Server/compare/v0.1.2...v0.2.0) (2026-06-09)

### Features

- add cerateUser and findByEmail ([840ccba](https://github.com/monsurcodes/AttendEase-Server/commit/840ccba7b39ccd86261a0e3b6b30f46d81abd73b))
- add ConfigModule to read .env ([1c6eb3b](https://github.com/monsurcodes/AttendEase-Server/commit/1c6eb3be1b15e02bf8746e520ba5b2ea65272291))
- add CreateUserDto ([f80fe22](https://github.com/monsurcodes/AttendEase-Server/commit/f80fe2255895667d6cb20b45ca14859055295b44))
- add packages ([bb5969a](https://github.com/monsurcodes/AttendEase-Server/commit/bb5969acf3ad8b6c3daa6885ab8f9d625b0bd55e))
- add register user ([de257b9](https://github.com/monsurcodes/AttendEase-Server/commit/de257b95efa6712809f2322417b6d994d35d47db))
- add RegisterDto ([1e1e6f0](https://github.com/monsurcodes/AttendEase-Server/commit/1e1e6f029e8acab1e482b4e1cb9432f024119270))
- add request body to /auth/register endpoint ([4ea221e](https://github.com/monsurcodes/AttendEase-Server/commit/4ea221ef54c4e8197ec3dc3ad3542030cbb158fd))
- add UserModule ([852494d](https://github.com/monsurcodes/AttendEase-Server/commit/852494d7e54035baa1739e995a2744400193ccc3))
- approve bcrypt build ([49558f6](https://github.com/monsurcodes/AttendEase-Server/commit/49558f65c6eff22f709513ab923bf5c0736c36c9))
- exports itself for other modules to use ([886b9ae](https://github.com/monsurcodes/AttendEase-Server/commit/886b9ae94bcd4871a5ae9d752e2fc9403ca74cee))
- pass registerDto to register method ([88c4a90](https://github.com/monsurcodes/AttendEase-Server/commit/88c4a90a72153c68b7fa1e09ff1784f211487ced))

### Bug Fixes

- sasl prisma client error ([8492f07](https://github.com/monsurcodes/AttendEase-Server/commit/8492f0795d3811e6e26d97792038f4c8f771eaa8))

### [0.1.2](https://github.com/monsurcodes/AttendEase-Server/compare/v0.1.1...v0.1.2) (2026-06-08)

### Bug Fixes

- lint failure due to missing generated prisma client ([9e34045](https://github.com/monsurcodes/AttendEase-Server/commit/9e3404561bf0a16ce72d33190f38cbfa475400aa))

### [0.1.1](https://github.com/monsurcodes/AttendEase-Server/compare/v0.1.0...v0.1.1) (2026-06-08)

### Bug Fixes

- eslint errors related to unsafe calls ([70cbd7b](https://github.com/monsurcodes/AttendEase-Server/commit/70cbd7b8d6944ec7262ab9d63a9b6fa6343a5026))

## 0.1.0 (2026-06-08)

### Features

- add @nestjs/mapped-types to help create reusable DTOs ([68ee91d](https://github.com/monsurcodes/AttendEase-Server/commit/68ee91df3778b6f08c73d69838b2ff701b6d63f3))
- add api prefix globally to all endpoints except /health ([99aaa72](https://github.com/monsurcodes/AttendEase-Server/commit/99aaa727555834a8cda9ba06a14cc57e8297a6c9))
- add auth module ([001e4ff](https://github.com/monsurcodes/AttendEase-Server/commit/001e4ff7479a79364102379f3d3d3dce547cddeb))
- add BUG report template ([0936386](https://github.com/monsurcodes/AttendEase-Server/commit/0936386a597d9bb01cf12702fd64c247a441d897))
- add ci pipeline to lint and format code ([2325a60](https://github.com/monsurcodes/AttendEase-Server/commit/2325a60c5997c692ccb4c71b9db6985f0e12ff81))
- add dependabot to update packages automatically ([328c019](https://github.com/monsurcodes/AttendEase-Server/commit/328c019b9d879d81588ab36de89c0335bb21776b))
- add docker config to spin up local postgres db ([16d7bc7](https://github.com/monsurcodes/AttendEase-Server/commit/16d7bc7ddbdedb878aabb0d7d245a043b537a632))
- add generated prisma dir ([5e7beae](https://github.com/monsurcodes/AttendEase-Server/commit/5e7beae840e4e46a19d50f2d74aa105b9458a557))
- add more descriptive project readme ([9bd669c](https://github.com/monsurcodes/AttendEase-Server/commit/9bd669cffa1663f498e7b251dde6e836834e5386))
- add packages ([e68cf63](https://github.com/monsurcodes/AttendEase-Server/commit/e68cf63daed21c338729c856fa005e829cd4e015))
- add PR template ([d15fc50](https://github.com/monsurcodes/AttendEase-Server/commit/d15fc501aa2a37c40a6a12b901fce073d21b3931))
- add prisma config file ([b7251b6](https://github.com/monsurcodes/AttendEase-Server/commit/b7251b648715998cd93dd3d01b5008ca358ed1f2))
- add prisma module ([1f411c9](https://github.com/monsurcodes/AttendEase-Server/commit/1f411c9c56abe4c608e8d5a29b06352bbbcd5c9d))
- add prisma schema ([3f2b3ee](https://github.com/monsurcodes/AttendEase-Server/commit/3f2b3ee3d80846fc3a65624e0da594214c32540d))
- add user module ([3f15f76](https://github.com/monsurcodes/AttendEase-Server/commit/3f15f76a130ee139a97c9f582026f02901a8df3a))
- add UserModule and Prisma Module ([483a4ca](https://github.com/monsurcodes/AttendEase-Server/commit/483a4cab6ecc904cf2eb451c168a8c549986fb73))
- api endpoints ([6c22e32](https://github.com/monsurcodes/AttendEase-Server/commit/6c22e3269435b4647f44a9fb2a984f4fc4ac4ced))
- approved build for prisma ([f10833c](https://github.com/monsurcodes/AttendEase-Server/commit/f10833ceedb4990788961be2d5011360208d7a51))
- base endpoint sends json res instead of a string ([2909257](https://github.com/monsurcodes/AttendEase-Server/commit/2909257ce837d321eead87ce1cbb1236c386dfbe))
- fix eslint parsing error ([3da09d3](https://github.com/monsurcodes/AttendEase-Server/commit/3da09d3c61e9bf0c6cda77a1a26f9457f5757611))
- ignore dir from lintting ([c469d25](https://github.com/monsurcodes/AttendEase-Server/commit/c469d25772d0285e1666fda0744a2427654fc25f))
- imported AuthModule ([2a31d3f](https://github.com/monsurcodes/AttendEase-Server/commit/2a31d3f40a5b60a6e986c2721d19564380f62d7c))
- initial commit ([88b2d4a](https://github.com/monsurcodes/AttendEase-Server/commit/88b2d4a80c3474476919263db040210ebc90e5bf))
- initial commit ([a5a5e9e](https://github.com/monsurcodes/AttendEase-Server/commit/a5a5e9e58fcecaaf327633caec799ba5ba1b47ee))
- prisma migration files ([638cc7f](https://github.com/monsurcodes/AttendEase-Server/commit/638cc7f33c770a2ad9db899dfcab9a6a3e1deb71))
- returns server health instead of just a hello world message ([30ef732](https://github.com/monsurcodes/AttendEase-Server/commit/30ef7325b1d2de4dbe60520eee4ccaaa1ff53fee))
