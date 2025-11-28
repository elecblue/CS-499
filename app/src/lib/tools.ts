/**
 * Generate an arithmetic sequence of numbers.
 *
 * Returns an array of numbers starting at `start` and incremented by `step`
 * until (but not including) `stop`. The sequence length is computed using
 * Math.ceil((stop - start) / step), so the returned values will never include
 * `stop` unless the sequence exactly lands on it.
 *
 * Examples:
 * - range(0, 5) -> [0, 1, 2, 3, 4]
 * - range(0, 6, 2) -> [0, 2, 4]
 * - range(5, 0, -1) -> [5, 4, 3, 2, 1]
 *
 * Remarks:
 * - `step` must be a non-zero finite number. Passing 0 will lead to an invalid
 *   array length (runtime error). If `step` has the wrong sign for the given
 *   `start`/`stop` (e.g. positive step when stop <= start), an empty array is returned.
 * - If `start === stop` the result is an empty array.
 *
 * @param start - The first value in the sequence.
 * @param stop - The exclusive upper (or lower, if step < 0) bound of the sequence.
 * @param step - The increment between successive values (defaults to 1). Must be non-zero.
 * @returns An array of numbers from `start` up to, but not including, `stop`, stepping by `step`.
 */
export const range = function _range(start: number, stop: number, step: number = 1) { 
    return Array.from(
        { length: Math.ceil((stop - start) / step) },
        (_, i) => start + i * step
    );
};