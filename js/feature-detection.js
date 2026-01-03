/**
 * Feature Detection and Browser Compatibility Utilities
 * Detects browser features and provides fallbacks
 * Integrates with Modernizr when available
 */

(function () {
  'use strict';

  const FeatureDetector = {
    /**
     * Check if Modernizr is available
     */
    hasModernizr: function () {
      return typeof Modernizr !== 'undefined';
    },
    /**
     * Add CSS class to HTML element based on feature support
     */
    addFeatureClass: function (featureName, isSupported) {
      const html = document.documentElement;
      if (isSupported) {
        html.classList.add(featureName);
      } else {
        html.classList.add('no-' + featureName);
      }
    },

    /**
     * Check if CSS Grid is supported
     */
    checkGrid: function () {
      const isSupported = CSS.supports('display', 'grid');
      this.addFeatureClass('css-grid', isSupported);
      return isSupported;
    },

    /**
     * Check if CSS Flexbox is supported
     */
    checkFlexbox: function () {
      const isSupported = CSS.supports('display', 'flex');
      this.addFeatureClass('flexbox', isSupported);
      return isSupported;
    },

    /**
     * Check if CSS Custom Properties (variables) are supported
     */
    checkCSSVariables: function () {
      const isSupported = window.CSS && CSS.supports('color', 'var(--test)');
      this.addFeatureClass('css-variables', isSupported);
      return isSupported;
    },

    /**
     * Check if IntersectionObserver is supported (for lazy loading)
     */
    checkIntersectionObserver: function () {
      const isSupported = 'IntersectionObserver' in window;
      this.addFeatureClass('intersection-observer', isSupported);
      return isSupported;
    },

    /**
     * Check if Object-fit is supported (for responsive images)
     */
    checkObjectFit: function () {
      const isSupported = CSS.supports('object-fit', 'cover');
      this.addFeatureClass('object-fit', isSupported);
      return isSupported;
    },

    /**
     * Check if Backdrop Filter is supported
     */
    checkBackdropFilter: function () {
      const isSupported =
        CSS.supports('backdrop-filter', 'blur(10px)') ||
        CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
      this.addFeatureClass('backdrop-filter', isSupported);
      return isSupported;
    },

    /**
     * Check if Sticky positioning is supported
     */
    checkStickyPosition: function () {
      const isSupported =
        CSS.supports('position', 'sticky') ||
        CSS.supports('position', '-webkit-sticky');
      this.addFeatureClass('position-sticky', isSupported);
      return isSupported;
    },

    /**
     * Check if Aspect Ratio is supported
     */
    checkAspectRatio: function () {
      const isSupported = CSS.supports('aspect-ratio', '16 / 9');
      this.addFeatureClass('aspect-ratio', isSupported);
      return isSupported;
    },

    /**
     * Check if localStorage is available
     */
    checkLocalStorage: function () {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        this.addFeatureClass('localstorage', true);
        return true;
      } catch (e) {
        this.addFeatureClass('localstorage', false);
        return false;
      }
    },

    /**
     * Check if touch events are supported
     */
    checkTouchEvents: function () {
      const isSupported =
        'ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch) ||
        navigator.maxTouchPoints > 0;
      this.addFeatureClass('touch', isSupported);
      return isSupported;
    },

    /**
     * Detect browser and add class
     */
    detectBrowser: function () {
      const userAgent = navigator.userAgent;
      const html = document.documentElement;

      // Detect specific browsers
      if (userAgent.indexOf('Edge') > -1 || userAgent.indexOf('Edg') > -1) {
        html.classList.add('browser-edge');
      } else if (userAgent.indexOf('Chrome') > -1) {
        html.classList.add('browser-chrome');
      } else if (userAgent.indexOf('Safari') > -1) {
        html.classList.add('browser-safari');
      } else if (userAgent.indexOf('Firefox') > -1) {
        html.classList.add('browser-firefox');
      } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        html.classList.add('browser-ie');
      }

      // Detect mobile
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        html.classList.add('is-mobile');
      } else {
        html.classList.add('is-desktop');
      }
    },

    /**
     * Initialize all feature detections
     */
    init: function () {
      // Run all feature detection checks
      this.checkGrid();
      this.checkFlexbox();
      this.checkCSSVariables();
      this.checkIntersectionObserver();
      this.checkObjectFit();
      this.checkBackdropFilter();
      this.checkStickyPosition();
      this.checkAspectRatio();
      this.checkLocalStorage();
      this.checkTouchEvents();
      this.detectBrowser();

      // Log feature support (only in development)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Feature Detection Results:', {
          grid: this.checkGrid(),
          flexbox: this.checkFlexbox(),
          cssVariables: this.checkCSSVariables(),
          intersectionObserver: this.checkIntersectionObserver(),
          objectFit: this.checkObjectFit(),
          backdropFilter: this.checkBackdropFilter(),
          stickyPosition: this.checkStickyPosition(),
          aspectRatio: this.checkAspectRatio(),
          localStorage: this.checkLocalStorage(),
          touch: this.checkTouchEvents(),
        });
      }
    },
  };

  /**
   * Polyfill for Element.closest() - for older browsers
   */
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
      let el = this;
      while (el) {
        if (el.matches(selector)) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };
  }

  /**
   * Polyfill for Element.matches() - for older browsers
   */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  /**
   * Polyfill for Array.find() - for IE11
   */
  if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  /**
   * Polyfill for NodeList.forEach() - for IE11
   */
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Run feature detection on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      FeatureDetector.init();
    });
  } else {
    FeatureDetector.init();
  }

  // Expose to window for external access if needed
  window.FeatureDetector = FeatureDetector;
})();
