# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-05-18

### Added

- Full TypeScript client for Yandex 360 for Business API
- Clients: `users`, `departments`, `groups`, `domains`, `dns`, `mailboxes`, `postSettings`, `twoFA`, `antispam`, `audit`, `authSettings`, `passwordManagement`, `routing`, `domainPolicies`, `externalContacts`, `oauthRestrictions`, `serviceApplications`, `organization`
- Automatic pagination via `getAll()` on all list clients
- `APIRequestError` with HTTP status code and API error body
- Full JSDoc on all public methods and types
- Strict TypeScript types with `string` for uint64 identifiers
