---
description: Add a new test case to Browser_Test_Script.md based on the recent feature request
---

1. **Analyze Context**: 
   - Review the conversation history to identify the most recent feature request or bug fix.
   - Determine the key functionality that needs verification.
   - Define specific steps to verify success (Steps to Reproduce).

2. **Read Test Script**: 
   - Read the content of `Documentation/Testing/Browser_Test_Script.md` to identify the highest existing Test Case ID (e.g., if TC-006 exists, the new one will be TC-007).
   - Locate the `## 🎯 Active Test Cases` section.

3. **Generate Test Case Markdown**: 
   - **CRITICAL**: If the test requires login, **ALWAYS** specify **Email Login** for automation.
   - Web3/Offline auth tests must be marked for **Manual Testing**.
   - Create a string following this strict template:
     ```markdown
     ### TC-[NextID]: [Feature Name/Summary]
     - **Priority**: Medium
     - **Status**: 🔄 Pending
     - **Description**: [Brief description of the test]
     - **Precondition**: [Login state (EMAIL ONLY for automation), specific page, or data required]
     - **Steps**:
       1. [Step 1]
       2. [Step 2]
       3. [Step 3]
     - **Expected**: [Clear success criteria]
     - **Actual**: _Not yet tested_
     - **Screenshot**: _None_
     
     ---
     
     ```

4. **Insert Test Case**: 
   - Use `replace_file_content` to insert the new test case logic.
   - **Insertion Point**: Find the end of the `## 🎯 Active Test Cases` section. A good strategy is to find the header for the *next* section (e.g., `## 🔐 Security & Audit Test Cases`) and insert the new test case *before* it.

5. **Resolution**: 
   - Inform the user that **TC-[NextID]** has been added to the test plan and is ready for execution.

6. **Verify Integrity**:
    - Run the `/codetest` workflow to ensure that the new test case or changes didn't break the build.
    - If `/codetest` fails, fix the code before proceeding.

7.  **Execute Tests**:
    - Once the build is green, proceed to `/browsertest` to execute the new test case along with the existing suite.
