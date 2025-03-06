// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import crypto from "node:crypto";

// required by Bootstrap to correctly load <Offcanvas /> components
// https://github.com/dyakovk/jest-matchmedia-mock
export default class MatchMedia {
  mediaQueries = {};

  constructor() {
    Object.defineProperty(this.window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query) => {
        this.mediaQueryList = {
          matches: query === this.currentMediaQuery,
          media: query,
          onchange: null,
          addListener: (listener) => {
            this.addListener(query, listener);
          },
          removeListener: (listener) => {
            this.removeListener(query, listener);
          },
          addEventListener: (type, listener) => {
            if (type !== "change") return;

            this.addListener(query, listener);
          },
          removeEventListener: (type, listener) => {
            if (type !== "change") return;

            this.removeListener(query, listener);
          },
          dispatchEvent: jest.fn(),
        };

        return this.mediaQueryList;
      },
    });
  }

  /**
   * Adds a new listener function for the specified media query
   * @private
   */
  addListener(mediaQuery, listener) {
    if (!this.mediaQueries[mediaQuery]) {
      this.mediaQueries[mediaQuery] = [];
    }

    const query = this.mediaQueries[mediaQuery];
    const listenerIndex = query.indexOf(listener);

    if (listenerIndex !== -1) return;
    query.push(listener);
  }

  /**
   * Removes a previously added listener function for the specified media query
   * @private
   */
  removeListener(mediaQuery, listener) {
    if (!this.mediaQueries[mediaQuery]) return;

    const query = this.mediaQueries[mediaQuery];
    const listenerIndex = query.indexOf(listener);

    if (listenerIndex === -1) return;
    query.splice(listenerIndex, 1);
  }

  /**
   * Updates the currently used media query,
   * and calls previously added listener functions registered for this media query
   * @public
   */
  useMediaQuery(mediaQuery) {
    if (typeof mediaQuery !== "string")
      throw new Error("Media Query must be a string");

    this.currentMediaQuery = mediaQuery;

    if (!this.mediaQueries[mediaQuery]) return;

    const mqListEvent = {
      matches: true,
      media: mediaQuery,
    };

    this.mediaQueries[mediaQuery].forEach((listener) => {
      listener.call(this.mediaQueryList, mqListEvent);
    });
  }

  /**
   * Returns an array listing the media queries for which the matchMedia has registered listeners
   * @public
   */
  getMediaQueries() {
    return Object.keys(this.mediaQueries);
  }

  /**
   * Returns a copy of the array of listeners for the specified media query
   * @public
   */
  getListeners(mediaQuery) {
    if (!this.mediaQueries[mediaQuery]) return [];
    return this.mediaQueries[mediaQuery].slice();
  }

  /**
   * Clears all registered media queries and their listeners
   * @public
   */
  clear() {
    this.mediaQueries = {};
  }

  /**
   * Clears all registered media queries and their listeners,
   * and destroys the implementation of `window.matchMedia`
   * @public
   */
  destroy() {
    this.clear();
    delete this.window.matchMedia;
  }
}

new MatchMedia();

// required for utils/db that uses IndexedDB for storing information
const mockIndexedDB = {
  open: jest.fn().mockImplementation(() => ({
    onerror: null,
    onsuccess: null,
    result: {
      createObjectStore: jest.fn(),
    },
  })),
  // Mock other IndexedDB methods and properties as needed
};

global.indexedDB = mockIndexedDB;

// required for any component that imports powerbi-client-react or requires Auth0Provider
this.window.crypto = crypto.webcrypto;

// fix for dateFilter / principleChartFilter returning null due to constants being a reserved name in node.js
jest.mock("constants", () => require("./constants"));

global.navigator.geolocation = {
  getCurrentPosition: () => {},
};
global.navigator.permissions = {
  query: () => Promise.resolve({ state: "granted" }),
};

const mockEcharts = {
  init: () => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    getOption: jest.fn(),
  }),
  connect: jest.fn(),
  disconnect: jest.fn(),
  getInstanceByDom: jest.fn(),
  registerTheme: jest.fn(),
  registerMap: jest.fn(),
};

jest.mock("echarts", () => mockEcharts);

this.window.scrollTo = jest.fn();
this.window.HTMLElement.prototype.scrollTo = jest.fn();

