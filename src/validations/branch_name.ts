import { info, getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

export default function validateBranchName() {
  try {
    const branchName = context.payload.pull_request?.head.ref;
    const branchNameRegex = getInput('branch_regex', { required: true });

    info(`Checking if branch name "${branchName}" matches regex: ${branchNameRegex}`);

    if (!new RegExp(branchNameRegex).test(branchName)) {
      setFailed(`Branch name "${branchName}" does not match regex: ${branchNameRegex}`);
      return;
    }
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}
