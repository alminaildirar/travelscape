# Automated Cross-Browser Testing

This directory contains automated testing scripts for cross-browser compatibility testing using Selenium WebDriver and BrowserStack.

## Prerequisites

### Required Software
- **Node.js** 14.0.0 or higher
- **npm** (comes with Node.js)

### Browser Drivers

**Chrome & Firefox**: Automatically managed by Selenium WebDriver (no manual installation needed)

**Edge (Windows)**: Requires manual installation:
1. Check Edge version: Menu `...` → Help and feedback → About Microsoft Edge
2. Download matching driver from [Microsoft Edge WebDriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
3. Extract and place `msedgedriver.exe` in `WebBasics/drivers/` folder
4. The test suite will automatically use this driver

**Safari (macOS)**: Built-in driver, just enable:
- Safari → Preferences → Advanced → "Show Develop menu"
- Develop → Allow Remote Automation

## Installation

1. Install dependencies:
```bash
npm install
```

This will install:
- `selenium-webdriver` - Browser automation framework
- `http-server` - Simple HTTP server for testing

## Running Tests

### Quick Start

Run all tests on all available browsers:
```bash
npm test
```

### Individual Browser Tests

Test on specific browsers:
```bash
npm run test:chrome     # Test on Chrome
npm run test:firefox    # Test on Firefox
npm run test:safari     # Test on Safari (macOS only)
npm run test:edge       # Test on Edge
```

### Start Development Server

Start the test server manually:
```bash
npm run serve
```
Server will run on `http://localhost:8080`

## Test Structure

### Files

- `server.js` - Simple HTTP server for serving the app during tests
- `run-tests.js` - Main test runner, automatically starts server and runs all tests
- `selenium-chrome.js` - Chrome-specific test suite
- `selenium-all-browsers.js` - Run tests on all browsers sequentially
- `browserstack.config.js` - BrowserStack configuration (cloud testing)

### What Gets Tested

Each test suite checks:

1. ✅ **Page Load** - Verify page loads successfully
2. ✅ **Page Title** - Check correct page title
3. ✅ **Destinations Grid** - Verify cards are rendered
4. ✅ **Filter Functionality** - Test location/price filtering
5. ✅ **Modal Functionality** - Test opening and closing modals
6. ✅ **Responsive Design** - Test all breakpoints (mobile, tablet, desktop)
7. ✅ **Feature Detection** - Verify HTML classes are added correctly
8. ✅ **Navigation** - Check navigation links

## BrowserStack Integration (Cloud Testing)

BrowserStack allows testing on real devices and browsers in the cloud.

### Setup

1. Sign up at [https://www.browserstack.com/](https://www.browserstack.com/)

2. Get your credentials from Account Settings

3. Set environment variables:
```bash
# Windows (PowerShell)
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"

# macOS/Linux
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

4. Edit `browserstack.config.js` and update capabilities as needed

5. Install BrowserStack Local:
```bash
npm install browserstack-local
```

### Configured Test Environments

Desktop Browsers:
- Chrome (latest) on Windows 11
- Firefox (latest) on Windows 11
- Edge (latest) on Windows 11
- Safari (latest) on macOS Ventura

Mobile Devices:
- iPhone 14 Pro (iOS 16)
- Samsung Galaxy S23 (Android 13)
- iPad Pro 12.9 (iOS 16)

Legacy:
- Internet Explorer 11 on Windows 10

## Troubleshooting

### Server not starting
```bash
# Check if port 8080 is in use
# Windows
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080
```

### Browser driver not found

**Chrome/Firefox**: These should work automatically. If not, ensure browsers are installed and updated.

**Edge**:
```bash
# Check if driver exists
ls drivers/msedgedriver.exe   # Should show the file

# If missing, download from:
# https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
# Extract and place in drivers/ folder
```

### Tests timing out
Increase timeout in test files or check network connection

### Safari tests not working (macOS)
1. Open Safari
2. Go to Safari → Preferences → Advanced
3. Enable "Show Develop menu in menu bar"
4. Go to Develop → Allow Remote Automation

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Cross-Browser Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm test
```

## Best Practices

- Run tests before committing code
- Test on at least 2 different browsers locally
- Use BrowserStack for comprehensive testing before production
- Keep browser drivers updated
- Update test cases when adding new features

## Additional Resources

- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [WebDriver Specification](https://w3c.github.io/webdriver/)
- [BrowserStack Documentation](https://www.browserstack.com/docs/)
- [MDN Cross-Browser Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing)
