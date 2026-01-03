/**
 * BrowserStack Configuration
 * Cross-browser testing on real devices and browsers
 *
 * Setup Instructions:
 * 1. Sign up at https://www.browserstack.com/
 * 2. Get your username and access key from Account Settings
 * 3. Set environment variables:
 *    - BROWSERSTACK_USERNAME=your_username
 *    - BROWSERSTACK_ACCESS_KEY=your_access_key
 * 4. Install: npm install browserstack-local
 * 5. Run: node tests/browserstack-test.js
 */

module.exports = {
  // BrowserStack Credentials
  user: process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',

  // BrowserStack Hub URL
  server: 'hub-cloud.browserstack.com',

  // Test configurations for different browsers and devices
  capabilities: [
    // Desktop Browsers
    {
      browserName: 'Chrome',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '11',
      resolution: '1920x1080',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      'browserstack.console': 'verbose',
      name: 'Chrome on Windows 11'
    },
    {
      browserName: 'Firefox',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '11',
      resolution: '1920x1080',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Firefox on Windows 11'
    },
    {
      browserName: 'Edge',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '11',
      resolution: '1920x1080',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Edge on Windows 11'
    },
    {
      browserName: 'Safari',
      browser_version: 'latest',
      os: 'OS X',
      os_version: 'Ventura',
      resolution: '1920x1080',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Safari on macOS Ventura'
    },

    // Mobile Devices
    {
      browserName: 'iPhone',
      device: 'iPhone 14 Pro',
      real_mobile: 'true',
      os_version: '16',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Safari on iPhone 14 Pro'
    },
    {
      browserName: 'android',
      device: 'Samsung Galaxy S23',
      real_mobile: 'true',
      os_version: '13.0',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Chrome on Samsung Galaxy S23'
    },
    {
      browserName: 'iPad',
      device: 'iPad Pro 12.9 2022',
      real_mobile: 'true',
      os_version: '16',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      name: 'Safari on iPad Pro'
    },

    // Legacy Browser Testing
    {
      browserName: 'IE',
      browser_version: '11',
      os: 'Windows',
      os_version: '10',
      resolution: '1366x768',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      'browserstack.ie.enablePopups': 'true',
      name: 'IE 11 on Windows 10 (Legacy)'
    }
  ],

  // Common capabilities
  commonCapabilities: {
    'browserstack.local': 'true',
    'browserstack.debug': 'true',
    'browserstack.networkLogs': 'true',
    'browserstack.console': 'verbose',
    project: 'TravelScape',
    build: `Build ${new Date().toISOString().split('T')[0]}`
  },

  // Test settings
  timeout: 30000,
  retries: 2
};
