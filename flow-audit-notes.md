# RevenueOS Flow Audit Notes

## Scope

Audit target: frontend prototype flow structure in `prototype/index.html`, `prototype/app.js`, and `prototype/styles.css`.

User goal: choose a client once, then run every RevenueOS workflow for that selected client.

## Findings

1. Client selection was duplicated.
   The DAG screen had its own client selector while other screens used generic data. This made the app feel like separate modules instead of one selected-client workspace.

2. Command repeated the client-selection job.
   The "Top Deals" panel acted like another deal picker. After the user selects a client, Command should summarize that account, not ask the user to choose again.

3. Several tabs lacked selected-client context.
   Power Map, Assessment, Gates, and Agents showed useful modules, but they did not clearly inherit the selected client.

4. Client detail was missing.
   Users needed a quick profile surface for basic company data, SPOC, owner, value, stage, health, risk, and next action.

## Changes Applied

1. Added a global client selector in the header.
2. Removed the duplicate DAG client selector.
3. Converted Command's deal list into a selected-client snapshot.
4. Made all major screens read from the active client.
5. Added a "View details" client profile workspace with basic company and SPOC data.
6. Made breadcrumbs expose the selected client as a clickable detail entry.

## Remaining Check

Screenshot-level visual QA was not completed in this run because the work was made directly against the static local prototype files.
