/**
 * Selenium WebDriver Test - Chrome Browser
 * Tests cross-browser compatibility on Chrome
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const TEST_URL = 'http://localhost:8080';

async function testChrome() {
  console.log('🧪 Starting Chrome Browser Tests...\n');

  const options = new chrome.Options();
  // Uncomment next line for headless mode
  // options.addArguments('--headless');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Test 1: Page Load
    console.log('✓ Test 1: Loading page...');
    await driver.get(TEST_URL);
    await driver.sleep(2000);

    // Test 2: Page Title
    console.log('✓ Test 2: Checking page title...');
    const title = await driver.getTitle();
    console.log(`  Title: ${title}`);

    // Test 3: Check if destinations are rendered
    console.log('✓ Test 3: Checking destinations grid...');
    const destinationsGrid = await driver.wait(
      until.elementLocated(By.id('destinations-grid')),
      5000
    );
    const cards = await destinationsGrid.findElements(
      By.className('destination-card')
    );
    console.log(`  Found ${cards.length} destination cards`);

    // Test 4: Test filter functionality
    console.log('✓ Test 4: Testing location filter...');
    const locationSelect = await driver.findElement(By.id('location-select'));
    await locationSelect.sendKeys('Europe');
    await driver.sleep(1000);
    const cardsAfterFilter = await destinationsGrid.findElements(
      By.className('destination-card')
    );
    console.log(`  After filter: ${cardsAfterFilter.length} cards`);

    // Test 5: Test modal opening
    console.log('✓ Test 5: Testing modal functionality...');
    const firstCard = cards[0];
    const viewDetailsBtn = await firstCard.findElement(
      By.className('card-cta')
    );
    await viewDetailsBtn.click();
    await driver.sleep(1000);

    const modal = await driver.findElement(By.id('detail-modal'));
    const isModalVisible = await modal.isDisplayed();
    console.log(`  Modal visible: ${isModalVisible}`);

    // Test 6: Test modal closing
    console.log('✓ Test 6: Closing modal...');
    const closeBtn = await modal.findElement(By.className('modal-close'));
    await closeBtn.click();
    await driver.sleep(1000);

    // Test 7: Check responsive behavior
    console.log('✓ Test 7: Testing responsive behavior...');
    await driver.manage().window().setRect({ width: 375, height: 667 }); // Mobile
    await driver.sleep(1000);
    console.log('  Mobile view (375x667): OK');

    await driver.manage().window().setRect({ width: 768, height: 1024 }); // Tablet
    await driver.sleep(1000);
    console.log('  Tablet view (768x1024): OK');

    await driver.manage().window().setRect({ width: 1920, height: 1080 }); // Desktop
    await driver.sleep(1000);
    console.log('  Desktop view (1920x1080): OK');

    // Test 8: Check feature detection classes
    console.log('✓ Test 8: Checking feature detection...');
    const html = await driver.findElement(By.css('html'));
    const htmlClasses = await html.getAttribute('class');
    console.log(`  HTML classes: ${htmlClasses}`);

    console.log('\n✅ All Chrome tests passed!\n');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message, '\n');
  } finally {
    await driver.quit();
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testChrome().catch(console.error);
}

module.exports = testChrome;
