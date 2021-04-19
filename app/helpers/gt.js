import { helper } from '@ember/component/helper';

export default helper(function gt([ value, expected ]) {
  return value > expected;
});
