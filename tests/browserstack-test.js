/**
 * BrowserStack Automated Testing
 * Tests the application on real devices and browsers in the cloud
 */

const { Builder, By, until } = require("selenium-webdriver");
const config = require("./browserstack.config");

const TEST_URL = "http://localhost:8080";

/**
 * Build BrowserStack capabilities for a given browser configuration
 */
function buildCapabilities(capability) {
  const capabilities = {
    ...capability,
    ...config.commonCapabilities,
  };

  return capabilities;
}

/**
 * Run tests on a specific BrowserStack configuration
 */
async function runTestOnBrowserStack(capability) {
  const browserName = capability.name || capability.browserName;
  console.log(`\n${"=".repeat(70)}`);
  console.log(`🌐 Testing on BrowserStack: ${browserName}`);
  console.log("=".repeat(70));

  let driver;
  try {
    // Build WebDriver with BrowserStack capabilities
    const capabilities = buildCapabilities(capability);

    driver = await new Builder()
      .usingServer(`https://${config.user}:${config.key}@${config.server}/wd/hub`)
      .withCapabilities(capabilities)
      .build();

    // Test 1: Page Load
    console.log("✓ Test 1: Loading page...");
    await driver.get(TEST_URL);
    await driver.sleep(3000);

    // Test 2: Page Title
    console.log("✓ Test 2: Checking page title...");
    const title = await driver.getTitle();
    console.log(`  Title: ${title}`);

    if (!title || title.length === 0) {
      throw new Error("Page title is empty!");
    }

    // Test 3: Destinations Grid
    console.log("✓ Test 3: Checking destinations grid...");
    const destinationsGrid = await driver.wait(
      until.elementLocated(By.id("destinations-grid")),
      10000
    );
    const cards = await destinationsGrid.findElements(
      By.className("destination-card")
    );
    console.log(`  Found ${cards.length} destination cards`);

    if (cards.length === 0) {
      throw new Error("No destination cards found!");
    }

    // Test 4: Filter Functionality (skip on mobile)
    if (!capability.device) {
      console.log("✓ Test 4: Testing filters...");
      const locationSelect = await driver.findElement(By.id("location-select"));
      await locationSelect.sendKeys("Asia");
      await driver.sleep(2000);

      const cardsAfterFilter = await destinationsGrid.findElements(
        By.className("destination-card")
      );
      console.log(`  After Asia filter: ${cardsAfterFilter.length} cards`);
    } else {
      console.log("⊘ Test 4: Skipped (mobile device)");
    }

    // Test 5: Modal Functionality
    console.log("✓ Test 5: Testing modal...");
    const cardsToTest = await destinationsGrid.findElements(
      By.className("destination-card")
    );

    if (cardsToTest.length > 0) {
      const viewBtn = await cardsToTest[0].findElement(
        By.className("card-cta")
      );

      // Scroll and click
      await driver.executeScript(
        'arguments[0].scrollIntoView({block: "center"});',
        viewBtn
      );
      await driver.sleep(1000);
      await driver.executeScript("arguments[0].click();", viewBtn);
      await driver.sleep(2000);

      const modal = await driver.findElement(By.id("detail-modal"));
      const isVisible = await modal.isDisplayed();
      console.log(`  Modal visible: ${isVisible}`);

      // Close modal
      const closeBtn = await modal.findElement(By.className("modal-close"));
      await driver.executeScript("arguments[0].click();", closeBtn);
      await driver.sleep(1000);
    }

    // Test 6: Feature Detection
    console.log("✓ Test 6: Checking feature detection...");
    const html = await driver.findElement(By.css("html"));
    const classes = await html.getAttribute("class");
    console.log(`  HTML classes: ${classes ? "detected" : "none"}`);

    // Mark test as passed on BrowserStack
    await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "All tests passed"}}');

    console.log(`\n✅ ${browserName} - All tests passed!\n`);
    return true;
  } catch (error) {
    console.error(
      `\n❌ ${browserName} - Test failed:`,
      error.message,
      "\n"
    );

    // Mark test as failed on BrowserStack
    if (driver) {
      try {
        await driver.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${error.message}"}}`);
      } catch (e) {
        // Ignore executor errors
      }
    }

    return false;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

/**
 * Run all BrowserStack tests
 */
async function runAllBrowserStackTests() {
  console.log("\n🌐 Starting BrowserStack Cross-Browser Testing");
  console.log("=" .repeat(70));
  console.log(`📋 Testing ${config.capabilities.length} browser/device configurations`);
  console.log(`📍 Test URL: ${TEST_URL}`);
  console.log(`👤 BrowserStack User: ${config.user}`);
  console.log("=".repeat(70));

  // Check credentials
  if (!config.user || config.user === 'YOUR_USERNAME' ||
      !config.key || config.key === 'YOUR_ACCESS_KEY') {
    console.error("\n❌ ERROR: BrowserStack credentials not configured!");
    console.error("Please set the following environment variables:");
    console.error("  - BROWSERSTACK_USERNAME");
    console.error("  - BROWSERSTACK_ACCESS_KEY\n");
    console.error("Get your credentials from: https://www.browserstack.com/accounts/settings\n");
    process.exit(1);
  }

  const results = {};
  const startTime = Date.now();

  // Run tests sequentially to avoid hitting parallel test limits
  for (const capability of config.capabilities) {
    const name = capability.name || capability.browserName;
    try {
      results[name] = await runTestOnBrowserStack(capability);
    } catch (error) {
      console.error(`\n⚠️  Could not test ${name}:`, error.message, "\n");
      results[name] = false;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📊 BROWSERSTACK TEST SUMMARY");
  console.log("=".repeat(70));

  const passed = Object.values(results).filter((r) => r === true).length;
  const total = Object.keys(results).length;

  Object.entries(results).forEach(([browser, result]) => {
    const icon = result ? "✅" : "❌";
    const status = result ? "PASSED" : "FAILED";
    console.log(`${icon} ${browser.padEnd(40)} - ${status}`);
  });

  console.log("\n" + "=".repeat(70));
  console.log(`Total: ${passed}/${total} configurations passed`);
  console.log(`Duration: ${duration} minutes`);
  console.log(`View results: https://automate.browserstack.com/dashboard`);
  console.log("=".repeat(70) + "\n");

  process.exit(passed === total ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  runAllBrowserStackTests().catch((error) => {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { runAllBrowserStackTests, runTestOnBrowserStack };
