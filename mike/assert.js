/** Throw a new error with the given message.
 * @param {string} msg Message of the new error.
 * @example ```
 * if(!input) error('Invalid input');
 * ```
 */
export const error = msg => { throw new Error(msg) };

/** Throw an error if a test condition is false.
 * @param {*} test A condition to be tested for truthyness.
 * @param {string} [msg] Message of the new error if there is one.
 * @returns {*} If there is no error, the same `test` argument is returned.
 * @example ```
 * let input = 5;
 * assert(input++, 'Invalid input');//5 is truthy
 * input;//6
 * ```
 */
export const assert = (test, msg = '❌ ASSERT FAILED') => test || error(msg);

///* EOF *///
