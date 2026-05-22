---
description: Upgrade Retreat Marketplace to Plugin Architecture (Phase 3)
---

# Upgrade Marketplace Workflow

This workflow guides the refactoring of the `RetreatsPublishTab` and Payment Systems.

## Step 1: Breakdown Retreat Wizard
1. Identify the steps in `RetreatsPublishTab`.
   - Basic Info
   - Location
   - Schedule
   - Pricing
2. Create `frontend/plugins/retreat-wizard/` directory.
3. Create a sub-plugin for each step (e.g. `StepBasicInfo`).

## Step 2: Payment Isolation
1. Create `frontend/plugins/payments-stripe/`.
2. Create `frontend/plugins/payments-crypto/`.
3. Refactor `RetreatCard` to use these plugins.

## Step 3: Integration
1. Update `RetreatsPublishTab` to use a `WizardPluginRegistry`.
2. Verify flow.
