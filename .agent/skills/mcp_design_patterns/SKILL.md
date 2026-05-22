---
name: MCP Design Patterns & Integration
description: "Validate that MCP proxy server definitions adhere to OHM's Absolute Sovereign Identity and Data Mandates."
---

# 🔌 MCP Design Patterns Skill

> **Version:** 1.0 (Integration from Anthropic Claude Architect / ECC)
> **Petal:** 🚀 SHIP

## Overview

The Model Context Protocol (MCP) allows agents to connect to local development environments, databases, and APIs. While powerful, arbitrary external MCP integrations threaten OHM's core rule: **Data Sovereignty (All user data stays on Hetzner, EU).**

This skill dictates how to evaluate, design, and deploy MCP patterns.

## Core Mandates

### 1. Local-First Proxy Policy
You may never connect directly to a multi-tenant global SaaS via an unvetted MCP (e.g., public GitHub MCP, global Slack MCP) without routing through OHM's proxy guard (`ohm-rules-mcp` or similar). All prompts running through an external MCP must be sanitized of PII.

### 2. Optimize for "Grep" over "Glob"
When exposing large directories to MCP reading, configure the server to prioritize `ripgrep`/exact-match tooling over recursive tree dumping. Sending a 50k token raw structure dump via MCP will instantly trigger a CWP Context Degradation alert.

### 3. Server Configuration Hierarchy
MCP Server deployments must live in `.claude-plugin/mcp-configs` or `c:\ohm\.agent\configs\mcp`. 
Each config MUST define:
- **`command`:** The explicit local executable.
- **`env`:** Environment variables scoped ONLY to that server (No global `process.env` passing).

## When to Use This Skill
You are asked to add a new MCP tool to the repository, or you need to fetch external repository data using a third-party MCP SDK. Use this skill to validate that the deployment ensures strict data sovereignty and token-efficient tool design.
