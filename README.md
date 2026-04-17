# Nexus Core

> Cryptographic coordination infrastructure for hierarchically governed communities.

Nexus Core is an open source framework that provides the primitives organizations need to run their own communication and coordination infrastructure: identity, encryption, hierarchy, action routing, credential verification, and tamper-evident audit. It is designed for organizations with a defined membership and a trust hierarchy, and it is built for deployment by the community itself rather than as a hosted service.

Nexus Core is maintained by [Rasembli Inc.](https://rasembli.com), a Canadian cryptographic infrastructure company.

---

## Status

Early development. Current tag: `v0.0.0-repo`. Next milestone: `v0.1.0-crypto` (libsodium primitives).

See [`docs/roadmap.md`](./docs/roadmap.md) and [`CLAUDE.md`](./CLAUDE.md) for the active phase and development context.

---

## The problem

Organizations with a defined hierarchy (military units, police services, law firms, healthcare networks, labour unions, religious communities, professional bodies) need communication infrastructure that is simultaneously:

1. **Externally opaque.** Outsiders cannot read internal communications, even with legal or technical access to the hosting infrastructure.
2. **Internally accountable.** Leadership retains governance visibility and audit access within the defined community, through explicit cryptographic mechanisms rather than vendor backdoors.
3. **Community owned.** The organization governs its own trust model, holds its own keys, and is not dependent on a third-party platform to operate.

Existing tools address parts of this. None address all three.

| Category | Example | External opacity | Internal accountability | Community ownership |
|---|---|---|---|---|
| Consumer secure messengers | Signal, WhatsApp | Strong | Resists institutional accountability by design | No |
| Enterprise collaboration | Slack, Teams | Weak (vendor holds keys) | Yes | No |
| Federated open networks | Matrix, Bluesky | Varies | Flat, not hierarchical | Partial |
| **Nexus Core** | | **Strong** | **By explicit cryptographic design** | **Yes** |

Nexus Core occupies the middle ground: closed cryptographic enclaves with internal accountability built into the protocol.

---

## Architecture: the three layers

```
┌─────────────────────────────────────────────────────────────┐
│  Rasembli                                                    │
│  User-facing application. The interface humans use to       │
│  participate in a governed community.                       │
├─────────────────────────────────────────────────────────────┤
│  Native Enclave                                              │
│  The architectural pattern. Governance constitution, IAM    │
│  model, audit access controls, retention policy, ceremony   │
│  design. Turns primitives into institutional infrastructure.│
├─────────────────────────────────────────────────────────────┤
│  Nexus Core  (this repository)                               │
│  Open source cryptographic and architectural primitives.    │
│  Identity, encryption, hierarchy, actions, credentials,     │
│  audit. MIT licensed.                                        │
└─────────────────────────────────────────────────────────────┘
```

Anyone can build a Native Enclave on top of Nexus Core. Anyone can build a client on top of Native Enclave. The layers are transparent and the code is open.

---

## What Nexus Core provides

Six packages, each solving one problem well.

### `packages/identity`
Member registration, key management, status transitions (pending, active, suspended, revoked), and hierarchical activation flows. An identity is bound to an organizational role, not just a human.

### `packages/crypto`
libsodium wrappers for Ed25519 signing, X25519 key exchange, XSalsa20 symmetric encryption, crypto_secretstream for group messaging, and Argon2 for password hashing. All operations run client-side. The backend never touches plaintext.

### `packages/hierarchy`
Role engine, message routing, permission resolution. Implements chain-of-command activation, order propagation, and hierarchical audit access.

### `packages/actions`
Action type framework. Defines the schema for things a community does together: orders, taskings, acknowledgements, events, attestations. Field schemas, state transitions, response handling.

### `packages/credential`
QR credential generation and verification, WebAuthn biometric binding, and device attestation. Enables a member's device to act as a cryptographically provable credential, replacing physical tokens.

### `packages/ui-primitives`
Headless React components. No theming. Implementations layer their own visual identity on top.

---

## Technical foundation

- **Cryptography.** libsodium via `libsodium-wrappers`. No custom crypto, no rolled-your-own.
- **Frontend.** React, Vite, TypeScript, Tailwind CSS.
- **Backend.** Supabase (Postgres, Realtime, Row Level Security). Stores ciphertext and public keys only.
- **Deployment.** Netlify for static hosting, Cloudflare Workers for edge functions.
- **Audit.** Append-only hash chain. Any member can verify the integrity of the log without trusting the server.

All cryptographic operations run client-side. Private keys never leave the member's device.

---

## Repository structure

```
nexus-core/
  packages/
    identity/        Member registration, key management
    crypto/          libsodium wrappers, group keys, hash chain
    hierarchy/       Role engine, routing, permissions
    actions/         Action type framework, field schemas
    credential/      QR generation, WebAuthn, scanner
    ui-primitives/   Headless components, no theming
  examples/
    basic-config/    Minimal working reference implementation
  docs/
    architecture.md
    roadmap.md
    threat-model.md
  tests/
  CLAUDE.md          Current development phase and context
  README.md
  LICENSE
  SECURITY.md
```

---

## Who it is for

Any organization that has a defined membership and a chain of accountability. Specific audiences the project is designed to serve:

- Military and reserve units
- Provincial and municipal police services
- Law firms protecting privileged client communications
- Healthcare networks coordinating clinical teams
- Religious and faith communities
- Labour unions and professional bodies
- Civic organizations with structured governance

If your organization has members, roles, and a hierarchy, Nexus Core is built for you.

---

## Design principles

1. **Crypto primitives over protocols.** libsodium gives you the operations. Nexus Core composes them into the capabilities hierarchical organizations need, without wrapping everything in a proprietary protocol.
2. **Governance is cryptographic, not policy.** Trust relationships are enforced by keys and signatures, not by server-side rules that a vendor can change.
3. **Client-side by default.** The server sees ciphertext. Compromise of the backend does not compromise member communications.
4. **Hierarchy is a first-class concept.** Roles, chains of command, and activation ceremonies are built into the data model, not bolted on.
5. **Audit is tamper-evident and member-verifiable.** Hash chains let any authorized member verify the integrity of the record without trusting the operator.
6. **Framework, not product.** The open core is configurable. Implementations provide the specific vocabulary, workflows, and integrations for their domain.

---

## How it compares

**Signal.** Strong external opacity. Designed around individual privacy and anti-censorship. Does not model hierarchical accountability. A commanding officer has no more visibility than any other participant.

**Slack, Microsoft Teams.** Strong organizational accountability. Vendor holds the keys. Opaque to the public, transparent to the vendor. If the vendor is compromised, compelled, or deplatforms you, your communications are affected.

**Matrix.** Decentralized federation. Flat trust model. Designed for open federation across independent servers, not for closed governance within a single organization.

**Nexus Core.** Closed governance with cryptographic hierarchy. External opacity and internal accountability are not in tension. They are both properties of the same cryptographic design.

---

## Open core model

Nexus Core follows the open core pattern used by GitLab, Elastic, and HashiCorp. The framework is MIT licensed and community auditable. Rasembli Inc. offers hosted Native Enclave deployments, governance consulting, integrations, and enterprise support for organizations that want a managed implementation rather than a self-hosted one.

The open source layer and the commercial layer are clearly separated and published as such.

---

## Getting started

> Nexus Core is in active early development. The quickstart below describes the intended flow. Installable packages will ship with `v0.1.0-crypto`.

```bash
# Clone the repo
git clone https://github.com/rasembli/nexus-core.git
cd nexus-core

# Install dependencies
npm install

# Run the development server
npm run dev
```

Full setup, including Supabase configuration and the basic-config reference implementation, will be documented in [`docs/getting-started.md`](./docs/getting-started.md) when v0.1.0 ships.

---

## Roadmap

| Phase | Tag | Scope |
|---|---|---|
| 0 | `v0.0.0-repo` | Repository created (current) |
| 0 | `v0.0.1-scaffold` | Vite, Tailwind, Supabase, Netlify wired up |
| 1 | `v0.1.0-crypto` | libsodium primitives, tests |
| 2 | `v0.2.0-identity` | Member registration and activation |
| 3 | `v0.3.0-messaging` | Direct and group messaging |
| 4 | `v0.4.0-hierarchy` | Role engine, routing |
| 5 | `v0.5.0-actions` | Action framework |
| 6 | `v0.6.0-credential` | QR and WebAuthn |
| 7 | `v0.7.0-audit` | Hash chain |
| 1.0 | `v1.0.0` | Production readiness, reference implementation validated at 34 Signal Regiment |

Detailed roadmap in [`docs/roadmap.md`](./docs/roadmap.md).

---

## Contributing

Nexus Core welcomes contributions. Before the v0.1.0 release, the scope is being stabilized by the core maintainer and external PRs may sit in review.

Once v0.1.0 ships, contribution guidelines will be published in `CONTRIBUTING.md`. Until then, open an issue or start a Discussion before undertaking significant work.

Cryptography changes require extra scrutiny. PRs touching `packages/crypto` will be reviewed against the threat model documented in `docs/threat-model.md`.

---

## Security

Responsible disclosure of security issues is welcome and important. See [`SECURITY.md`](./SECURITY.md).

Do not open public issues for security-sensitive reports.

---

## Licence

MIT. See [`LICENSE`](./LICENSE).

Nexus Core is free for any person, organization, or government to use, modify, and distribute. Implementations built on Nexus Core are not required to be open source.

---

## About Rasembli Inc.

Rasembli Inc. is a Canadian cryptographic infrastructure company. It maintains the Nexus Core open source framework, defines the Native Enclave architectural pattern, and publishes the Rasembli client application. The corporation provides hosted deployments, governance consulting, and federation infrastructure for organizations that choose a managed implementation over self-hosting.

The name *Rasembli* derives from *rassemblement*, the French term for a military formation call and more broadly for a community gathering. The name captures the core function of the infrastructure: assembling a community around a shared, governed space.

- Website: [rasembli.com](https://rasembli.com)
- Contact: hello@rasembli.com
- Security: security@rasembli.com

---

## Acknowledgements

Nexus Core builds on the work of the libsodium, Signal Protocol, Matrix, and W3C WebAuthn communities. The cryptographic foundations are standard and battle-tested. The contribution of this project is the composition of those primitives into infrastructure that hierarchically governed communities can actually deploy.
