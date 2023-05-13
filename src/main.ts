import { setFailed } from '@actions/core';
import { validateTitle, validateBranchName } from './validations';

async function main() {
  try {
    await validateTitle();
    await validateBranchName();
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

main();
