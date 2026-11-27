<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/logo-dark.png">
  <img src=".github/assets/logo-light.png" alt="Hive by ZeepLabs" width="300">
</picture>

**A lightweight native Mac app to organize your projects and run AI coding agents in terminals — with a separate identity for each organization.**

[🇧🇷 Português](README.pt-BR.md) · **English**

[**⬇️ Download the latest version**](../../releases/latest)

</div>

<p align="center">
  <img src=".github/assets/screenshot.png" alt="Hive window: the project tree with the Pessoal and Cliente A organizations, and Claude Code waiting for approval to edit list.ts while Codex runs in another project" width="900">
</p>

## What is Hive?

If you run several AI agents (Claude Code, Codex, opencode) in parallel and work for more than one organization, a flat list of terminals mixes everything up. **Hive keeps your projects in a tree and runs each session with the identity of the organization that owns the project**: the right git author, SSH key, GitHub CLI account and agent settings.

It is a **native Mac app** (no Electron), made to stay light while several terminals are open.

## Features

- 🌳 **Project tree** — organization, nested groups, projects and git worktrees, with drag and drop, multi-selection and quick search.
- 🖥️ **Terminals** — tabs and splits per project; the layout comes back when you reopen the app.
- 🤖 **Agents in one click** — Shell, Claude Code, Codex and opencode, with a configurable command.
- 🪪 **Identity per organization** — git author, SSH key, GitHub CLI and agent settings applied to every session. Secret values live in the macOS Keychain.
- 🚦 **Agent status** — running, waiting for you or finished, in the tree and the tabs, with notifications.
- 📥 **Import by scan** — find the git repositories in a folder and review them before adding.
- 📊 **Resources** — CPU, memory, disk and process count for each session.

The interface is in Portuguese.

## Download and install

1. Open [**Releases**](../../releases/latest) and download the `.dmg` file.
2. Open it and **drag Hive to Applications**.
3. Open Hive from Launchpad or Spotlight.

The app is **signed and notarized by Apple**. The `SHA-256` of each file is in the release notes if you want to check your download.

**Requirements:** macOS 14 Sonoma or later.

## Updates

Hive **updates itself**: when a new version is out, it tells you and you choose whether to install it. On the second launch it asks whether it may check automatically; if you allow it, it checks this project's update feed once a day, which reveals your IP address and the app version to the host (GitHub). Nothing else is sent in that check. Every update is verified with a cryptographic signature before it is installed.

Besides the update check, Hive itself makes two other network requests: the read-only PR query through your own `gh` (only while the PRs tab is open) and the anonymous installation data described below. Your agents, git and anything else you run in the terminals connect on their own, as they would in any terminal.

## Anonymous installation and usage data

Hive sends anonymous events over HTTPS to Zeep Orbit, a ZeepLabs service (`orbit.zeeptecnologia.com.br`), on each new install, on each version update and, at most once a day, when the app opens. **This is always active: there is no setting to turn it off.**

**What is sent:**

- a random installation identifier (a UUID generated in the app, unrelated to any person, email, machine or account);
- the app name (`hive`), the event type (`install`, `update` or `launch`), the app version and build, and the previous version on updates;
- the operating system (macOS), the macOS version and the architecture (`arm64` or `x86_64`);
- the distribution channel and the date and time of the event.

**What is not sent:** name, email, username, hostname, file paths, names of organizations, projects or worktrees, environment variables, terminal content, code, tokens and language.

**IP address:** the IP address of the request is kept only in the server logs, for 30 days, and is not stored with the events.

**Why:** to count installs, updates and the versions and systems in use, so ZeepLabs can decide about releases and support.

**How long it is kept:** events are kept for 12 months, then deleted or aggregated into counts without the installation identifier. Events are stored in Zeep Orbit, hosted in Brazil (Oracle Cloud, São Paulo).

**Contact:** Zeep Labs, a brand of XPass Tecnology (CNPJ 37.818.214/0001-80). Privacy and data protection officer: legal@zeeptecnologia.com.br.

## Feedback and bugs

Open an [issue](../../issues) in this repository. **Never include tokens, SSH keys, API keys or other secrets** in an issue, and check terminal output for them before pasting it.

## About

This repository only holds the published versions and the update feed. The source code is not public.

© Zeep Labs. All rights reserved.
