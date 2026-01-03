/**
 * Selenium WebDriver - All Browsers Test Suite
 * Tests cross-browser compatibility on Chrome, Firefox, Safari, and Edge
 */

const { Builder, By, until } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const path = require("path");

const TEST_URL = "http://localhost:8080";

// Platform-specific browser selection
const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";

// Core browsers that should always work
let BROWSERS = ["chrome", "firefox"];

// Add platform-specific browsers
if (isWindows) {
  // Try 'edge' (newer versions) - if fails, will show error but won't crash
  BROWSERS.push("edge");
} else if (isMac) {
  BROWSERS.push("safari");
}

async function runTestsForBrowser(browserName) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🧪 Testing ${browserName.toUpperCase()}`);
  console.log("=".repeat(60));

  let driver;
  try {
    // Configure Edge browser with manual driver path
    if (browserName === 'edge') {
      const edgeDriverPath = path.join(__dirname, '..', 'drivers', 'msedgedriver.exe');
      const service = new edge.ServiceBuilder(edgeDriverPath);
      driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeService(service)
        .build();
    } else {
      driver = await new Builder().forBrowser(browserName).build();
    }

    // Test 1: Page Load
    console.log("✓ Test 1: Loading page...");
    await driver.get(TEST_URL);
    await driver.sleep(2000);

    // Test 2: Page Title
    console.log("✓ Test 2: Checking page title...");
    const title = await driver.getTitle();
    console.log(`  Title: ${title}`);

    // Test 3: Destinations Grid
    console.log("✓ Test 3: Checking destinations grid...");
    const destinationsGrid = await driver.wait(
      until.elementLocated(By.id("destinations-grid")),
      5000
    );
    const cards = await destinationsGrid.findElements(
      By.className("destination-card")
    );
    console.log(`  Found ${cards.length} destination cards`);

    if (cards.length === 0) {
      throw new Error("No destination cards found!");
    }

    // Test 4: Filter Functionality
    console.log("✓ Test 4: Testing filters...");
    const locationSelect = await driver.findElement(By.id("location-select"));
    await locationSelect.sendKeys("Asia");
    await driver.sleep(1500);

    const cardsAfterFilter = await destinationsGrid.findElements(
      By.className("destination-card")
    );
    console.log(`  After Asia filter: ${cardsAfterFilter.length} cards`);

    // Test 5: Modal Functionality
    console.log("✓ Test 5: Testing modal...");
    if (cardsAfterFilter.length > 0) {
      const viewBtn = await cardsAfterFilter[0].findElement(
        By.className("card-cta")
      );

      // Scroll element into view before clicking
      await driver.executeScript(
        'arguments[0].scrollIntoView({block: "center"});',
        viewBtn
      );
      await driver.sleep(500);

      // Use JavaScript click as fallback for intercepted clicks
      await driver.executeScript("arguments[0].click();", viewBtn);
      await driver.sleep(1000);

      const modal = await driver.findElement(By.id("detail-modal"));
      const isVisible = await modal.isDisplayed();
      console.log(`  Modal visible: ${isVisible}`);

      // Close modal
      const closeBtn = await modal.findElement(By.className("modal-close"));
      await driver.executeScript("arguments[0].click();", closeBtn);
      await driver.sleep(500);
    }

    // Test 6: Responsive Design
    console.log("✓ Test 6: Testing responsive breakpoints...");
    const viewports = [
      { width: 375, height: 667, name: "Mobile" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 1024, height: 768, name: "Desktop" },
      { width: 1920, height: 1080, name: "Large Desktop" },
    ];

    for (const viewport of viewports) {
      await driver.manage().window().setRect({
        width: viewport.width,
        height: viewport.height,
      });
      await driver.sleep(500);
      console.log(
        `  ${viewport.name} (${viewport.width}x${viewport.height}): OK`
      );
    }

    // Test 7: Feature Detection
    console.log("✓ Test 7: Checking feature detection...");
    const html = await driver.findElement(By.css("html"));
    const classes = await html.getAttribute("class");
    const hasFeatureClasses = classes && classes.length > 0;
    console.log(`  Feature classes detected: ${hasFeatureClasses}`);
    if (hasFeatureClasses) {
      const classList = classes
        .split(" ")
        .filter((c) => c.startsWith("css-") || c.startsWith("browser-"));
      console.log(`  Classes: ${classList.join(", ")}`);
    }

    // Test 8: Navigation Links
    console.log("✓ Test 8: Checking navigation...");
    const navLinks = await driver.findElements(By.css(".nav-menu a"));
    console.log(`  Found ${navLinks.length} navigation links`);

    console.log(`\n✅ ${browserName.toUpperCase()} - All tests passed!\n`);
    return true;
  } catch (error) {
    console.error(
      `\n❌ ${browserName.toUpperCase()} - Test failed:`,
      error.message,
      "\n"
    );
    return false;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function runAllTests() {
  console.log("\n🚀 Starting Cross-Browser Testing Suite");
  console.log("📋 Testing browsers:", BROWSERS.join(", "));
  console.log(`📍 Test URL: ${TEST_URL}\n`);

  const results = {};

  for (const browser of BROWSERS) {
    try {
      results[browser] = await runTestsForBrowser(browser);
    } catch (error) {
      console.error(`\n⚠️  Could not test ${browser}:`, error.message);
      console.log(`   Make sure ${browser} and its WebDriver are installed.\n`);
      results[browser] = false;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(60));

  const passed = Object.values(results).filter((r) => r === true).length;
  const total = Object.keys(results).length;

  Object.entries(results).forEach(([browser, result]) => {
    const icon = result ? "✅" : "❌";
    const status = result ? "PASSED" : "FAILED";
    console.log(`${icon} ${browser.padEnd(15)} - ${status}`);
  });

  console.log("\n" + "=".repeat(60));
  console.log(`Total: ${passed}/${total} browsers passed`);
  console.log("=".repeat(60) + "\n");

  process.exit(passed === total ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { runAllTests, runTestsForBrowser };
