import icon from '../Images/icons.svg';
import { TIMEOUT_SECONDE } from './config.js';

// this is timeout for maximum time fetching
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// general function for getting data of api
export async function getJson(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDE)]);
    // create an error
    if (!res.ok) throw new Error(`Could not found food. (${res.status})`);
    return await res.json();
  } catch (err) {
    // throw err;
    console.error(err);
  }
}

// get window hash
export const getWindowHash = () => window.location.hash.slice(1);
