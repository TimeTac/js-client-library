type Data = {
  [index: string]: any;
};

/*
 * Method check if object values are there and generate a string telling which one are missing.
 * Adding prefix and postfix if there are any.
 * Return object that tells if check passed and report message.
 *
 * @param {object} data to be checked
 * @param {string} prefix = undefined prefix of message
 * @param {string} postfix = undefined postfix of message
 *
 * @return {string} message
 */
export const objectCheck = (data: Data, prefix?: string, postfix?: string): string => {
  let message: string = `${prefix || ''} `;

  for (const key in data) {
    if (data[key] == undefined) {
      message += `${key}`;
    }
  }

  if (message) {
    message += `${postfix || '.'}`;
  }

  return message;
};
