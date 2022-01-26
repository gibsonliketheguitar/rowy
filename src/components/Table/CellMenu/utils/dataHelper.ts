/**
 *
 * @param value
 * @returns
 */
export function formatData(value: any) {
  const isFalsey = Boolean(value);
  if (typeof value === "object" && !isFalsey) return JSON.parse(value);
  else return `${value}`;
}

/**
 * @param value string value from clipboard
 * @returns converted value of undefined | null | false | string
 */

type rVal = undefined | null | false | true | string;

export async function formatClipData(value: string) {
  let rVal: rVal = value;
  if (value === "[object Object]") rVal = await JSON.parse(value);
  if (value === "undefined") rVal = undefined;
  if (value === "null") rVal = null;
  if (value === "false") rVal = false;
  if (value === "true") rVal = true;
  return rVal;
}
