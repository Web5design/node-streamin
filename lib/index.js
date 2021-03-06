var request = require('request');
var filed   = require('filed');


/**
 * Returns true if `io` is a stream.
 *
 * @param (Stream|Object) io
 * @return (boolean)
 */
function isStream(io) {
  return typeof io === 'object' &&
    (
      // readable stream
      (typeof io.pipe === 'function' && typeof io.readable === 'boolean' &&
       io.readable) ||
      // writable stream
      (typeof io.write === 'function' && typeof io.writable === 'boolean' &&
       io.writable)
    );
}


/**
 * Used to test if a string is a URL.
 */
var isURL = /^https?:/;


/**
 * Allows `io` to be a path to a file, a url, or a stream.
 *
 * @param (string|Stream) io
 * @param (!Object) requestOptions
 * @return (Stream)
 */
module.exports = function streamin(io, requestOptions) {

  if (isStream(io)) {
    return io;

  } else if (typeof io === 'string') {
    if (isURL.test(io)) {
      requestOptions = requestOptions || {};
      requestOptions.url = io;
      return request(requestOptions);

    } else {
      return filed(io);
    }

  } else {
    throw new TypeError('`io` is not a stream or a string');
  }
};
