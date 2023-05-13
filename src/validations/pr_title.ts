import { info, getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

export default function validateTitle() {
  try {
    const title = context.payload.pull_request?.title;
    const prefixes = getInput('allowed_prefixes', { required: true }).split(',');

    info(`Checking if title "${title}" starts with one of the allowed prefixes: ${prefixes}`);

    if (!prefixes.some((prefix) => title?.startsWith(prefix))) {
      setFailed(`Title "${title}" does not start with one of the allowed prefixes: ${prefixes}`);
      return;
    }

    // check title regex
    const titleRegex = getInput('title_regex', { required: true });
    info(`Checking if title "${title}" matches regex: ${titleRegex}`);

    if (!new RegExp(`^(${prefixes.join('|')}) ${titleRegex}`).test(title)) {
      setFailed(`Title "${title}" does not match regex: ${titleRegex}`);
      return;
    }
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}
