/**
 * Main Test Runner
 * Runs all cross-browser compatibility tests
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const SERVER_PORT = 8080;
const SERVER_STARTUP_DELAY = 2000;

let serverProcess = null;

// Check if server is running
async function isServerRunning() {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${SERVER_PORT}`, () => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.end();
  });
}

// Start test server
async function startServer() {
  console.log('🚀 Starting test server...');

  const serverPath = path.join(__dirname, 'server.js');
  serverProcess = spawn('node', [serverPath], {
    stdio: 'inherit',
    shell: true
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, SERVER_STARTUP_DELAY));

  const running = await isServerRunning();
  if (running) {
    console.log(`✅ Server running on http://localhost:${SERVER_PORT}\n`);
    return true;
  } else {
    console.error('❌ Failed to start server\n');
    return false;
  }
}

// Stop test server
function stopServer() {
  if (serverProcess) {
    console.log('\n🛑 Stopping test server...');
    serverProcess.kill();
    serverProcess = null;
  }
}

// Run tests
async function runTests() {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TRAVELSCAPE - CROSS-BROWSER TESTING SUITE');
  console.log('='.repeat(70) + '\n');

  let serverWasRunning = await isServerRunning();

  // Start server if not running
  if (!serverWasRunning) {
    const started = await startServer();
    if (!started) {
      console.error('Cannot run tests without server. Exiting...\n');
      process.exit(1);
    }
  } else {
    console.log(`✅ Server already running on http://localhost:${SERVER_PORT}\n`);
  }

  try {
    // Check if Selenium is available
    console.log('📦 Checking dependencies...');
    try {
      require('selenium-webdriver');
      console.log('✅ selenium-webdriver installed\n');
    } catch (error) {
      console.error('❌ selenium-webdriver not found!');
      console.error('   Run: npm install selenium-webdriver\n');
      process.exit(1);
    }

    // Run the test suite
    console.log('🏃 Running tests...\n');
    const { runAllTests } = require('./selenium-all-browsers.js');
    await runAllTests();
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    process.exit(1);
  } finally {
    // Stop server if we started it
    if (!serverWasRunning) {
      stopServer();
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Test interrupted by user');
  stopServer();
  process.exit(0);
});

process.on('uncaughtException', error => {
  console.error('\n❌ Uncaught exception:', error);
  stopServer();
  process.exit(1);
});

// Run tests
runTests().catch(error => {
  console.error('\n❌ Fatal error:', error);
  stopServer();
  process.exit(1);
});
