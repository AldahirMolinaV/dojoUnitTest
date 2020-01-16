// test-utils.js
import * as domTestingLib from '@testing-library/dom'
import { Matcher } from '@testing-library/dom';
import { MatcherOptions } from '@testing-library/dom';
const { queryHelpers } = domTestingLib;

export type GetById = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions,
) => HTMLElement

export const queryById: GetById = queryHelpers.queryByAttribute.bind(
  null,
  'id'
);

// re-export with overrides
module.exports = {
  ...domTestingLib,
  queryById
}
