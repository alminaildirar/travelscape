# TravelScape - Hotel & Destination Explorer

A modern, responsive travel and hotel booking interface built with vanilla HTML, CSS, and JavaScript. Features a mobile-first design approach with advanced filtering, sorting, and detail view capabilities.

## Features

- **Fully Responsive Design** - Seamlessly adapts from mobile (320px) to large desktop (1920px+)
- **Mobile-First Approach** - Optimized for mobile devices with progressive enhancement
- **Cross-Browser Compatible** - Comprehensive vendor prefixes, polyfills, and fallbacks
- **Advanced Filtering** - Filter by location, price range, and sort by multiple criteria
- **Interactive Modal** - Detailed view for each destination with full amenities list
- **Performance Optimized** - Lazy loading images with responsive srcset and picture elements
- **Smooth Animations** - Fade-in effects for images, hover transitions, and modal animations
- **Progressive Enhancement** - Works without JavaScript, enhanced with it
- **Accessible** - Semantic HTML5, ARIA labels, keyboard navigation support
- **Modular CSS Architecture** - Organized into separate modules for maintainability

## Tech Stack

- **HTML5** - Semantic markup with proper structure
- **CSS3** - Custom properties, Flexbox, CSS Grid, media queries
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Responsive Images** - Picture element, srcset for retina displays

## Project Structure

```
WebBasics/
├── index.html                    # Main HTML file
├── package.json                  # npm configuration and scripts
├── .gitignore                    # Git ignore rules
├── css/
│   ├── styles.css               # Main CSS file (imports all modules)
│   ├── reset.css                # CSS Reset and normalize
│   ├── variables.css            # CSS Custom Properties
│   ├── base.css                 # Base styles and layout
│   ├── components.css           # Component-specific styles
│   ├── responsive.css           # Media queries and breakpoints
│   └── fallbacks.css            # Legacy browser fallbacks
├── js/
│   ├── data.js                  # Hotel and destination data
│   ├── feature-detection.js    # Browser feature detection & polyfills
│   └── app.js                   # Application logic and interactivity
├── tests/
│   ├── README.md                # Testing documentation
│   ├── server.js                # Test HTTP server
│   ├── run-tests.js             # Main test runner
│   ├── selenium-chrome.js       # Chrome test suite
│   ├── selenium-all-browsers.js # All browsers test suite
│   └── browserstack.config.js   # BrowserStack configuration
├── images/                      # Image assets (placeholder)
└── README.md                    # Project documentation
```

## Responsive Breakpoints

- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1023px (2 column grid)
- **Desktop**: 1024px - 1279px (3 column grid)
- **Large Desktop**: ≥ 1280px (4 column grid)

## Key Features Implementation

### Flexbox Usage

- Navigation bar layout
- Filter controls horizontal/vertical adaptation
- Card content arrangement
- Footer section alignment
- Modal content structure

### CSS Grid Usage

- Main destinations grid (1→2→3→4 columns)
- Footer layout (responsive columns)
- Amenities list in modal view

### Responsive Typography

All font sizes use fluid typography with `clamp()`:

```css
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--font-size-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
```

### Responsive Images

Images are served at optimal sizes using:

- `<picture>` element for art direction
- `srcset` with 1x/2x density descriptors
- `loading="lazy"` for performance
- Different sizes for mobile, tablet, and desktop

Example:

```html
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="image-large.jpg 1x, image-large@2x.jpg 2x"
  />
  <source
    media="(min-width: 768px)"
    srcset="image-medium.jpg 1x, image-medium@2x.jpg 2x"
  />
  <img
    src="image-small.jpg"
    srcset="image-small.jpg 1x, image-small@2x.jpg 2x"
    loading="lazy"
  />
</picture>
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. Clone or download the repository

```bash
git clone <repository-url>
cd WebBasics
```

2. Open `index.html` in your browser

## Usage

### Filtering Destinations

- **Location Filter**: Select from Europe, Asia, Americas, or Oceania
- **Price Range**: Choose from Budget, Moderate, or Luxury options
- **Sort By**: Featured, Price (Low to High), Price (High to Low), or Rating

### Viewing Details

1. Click "View Details" on any destination card
2. Modal opens with full information:
   - Large hero image
   - Complete description
   - Amenities list
   - Pricing information
   - Reviews count and rating
3. Close modal by:
   - Clicking the × button
   - Pressing ESC key
   - Clicking outside the modal

## Browser Support

### Supported Browsers

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)
- **iOS Safari** 12+
- **Chrome Android** (latest)

### Legacy Browser Support

The project includes comprehensive cross-browser compatibility features:

#### CSS Features

- **Vendor Prefixes**: `-webkit-`, `-moz-`, `-ms-`, `-o-` for maximum compatibility
- **CSS Reset**: 22-point modern CSS reset for consistent rendering across browsers
- **Fallback Styles**: Alternative styles for browsers without modern CSS support
- **@supports Queries**: Feature detection for graceful degradation

#### JavaScript Polyfills

Included polyfills for legacy browsers (IE11+):

- `Element.prototype.closest()`
- `Element.prototype.matches()`
- `Array.prototype.find()`
- `NodeList.prototype.forEach()`

#### Feature Detection

The project uses both **Modernizr** (CDN) and custom feature detection:

- **Modernizr**: Industry-standard feature detection library
- **Custom Detection**: Lightweight runtime checks in `js/feature-detection.js`

Automatic detection and fallbacks for:

- CSS Grid → Flexbox fallback
- CSS Variables → Hard-coded color values
- Object-fit → Auto height adjustment
- Backdrop-filter → Solid background fallback
- Sticky positioning → Relative positioning
- Gap property → Margin-based spacing
- Aspect-ratio → Padding-based ratio
- Clamp() → Fixed font sizes with media queries

#### Browser-Specific Fixes

- Safari aspect-ratio fallback
- IE11 grid fallback using flexbox
- Firefox button focus styles
- iOS/Safari input styling
- Chrome number input arrows
- Edge legacy support

### Testing Browsers

The project has been tested on:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Legacy browsers with polyfills (IE11 with limited support)

## Performance Features

- **Lazy Loading**: Images load as they enter viewport
- **Fade-in Animation**: Smooth opacity transition on image load
- **Optimized Images**: Multiple sizes for different screen densities
- **CSS Custom Properties**: Centralized theme management
- **Minimal JavaScript**: Vanilla JS with no external dependencies

## Customization

### Changing Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #f59e0b;
  --color-accent: #10b981;
}
```

### Adding Destinations

Edit the `destinations` array in `js/data.js`:

```javascript
{
  id: 13,
  name: "Your Hotel Name",
  location: "City, Country",
  region: "europe|asia|americas|oceania",
  price: 200,
  priceRange: "budget|moderate|luxury",
  rating: 4.8,
  image: "image-url.jpg",
  badge: "New",
  description: "Description text...",
  amenities: ["WiFi", "Pool", "Spa"],
  reviews: 150
}
```

## Development Notes

- No build process required
- No CSS preprocessors
- No JavaScript frameworks
- Pure vanilla implementation
- Mobile-first CSS approach
- Progressive enhancement methodology
- Comprehensive cross-browser compatibility
- Modular CSS architecture with @import
- Feature detection with automatic fallbacks
- Vendor prefixes for maximum browser support

## Automated Testing

### Prerequisites

Before running tests, ensure you have the required browsers and WebDrivers installed:

#### Required Software

- **Node.js** 14.0.0 or higher
- **npm** (comes with Node.js)
- Modern browsers: Chrome, Firefox, Edge (Windows) or Safari (macOS)

#### WebDriver Setup

**Chrome & Firefox**: WebDrivers are automatically downloaded by Selenium.

**Edge (Windows)**: Requires manual driver installation:

1. **Check your Edge version**:
   - Open Edge browser
   - Click `...` menu → `Help and feedback` → `About Microsoft Edge`
   - Note your version number (e.g., `131.0.2903.112`)

2. **Download Edge Driver**:
   - Visit: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
   - Download the driver matching your Edge version
   - Choose the **x64** version for 64-bit Windows

3. **Install the driver**:
   - Extract the downloaded ZIP file
   - Create a `drivers` folder in the project root
   - Copy `msedgedriver.exe` to the `drivers` folder:
   ```
   WebBasics/
   └── drivers/
       └── msedgedriver.exe
   ```

**Safari (macOS only)**:

1. Open Safari → Preferences → Advanced
2. Enable "Show Develop menu in menu bar"
3. Go to Develop → Allow Remote Automation

### Quick Start

Run automated cross-browser tests:

```bash
# Install dependencies
npm install

# Run all tests (Chrome, Firefox, Edge on Windows / Safari on macOS)
npm test

# Test specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari   # macOS only
npm run test:edge     # Windows only
```

### What Gets Tested

The automated test suite performs 8 comprehensive tests on each browser:

1. ✅ **Page Load** - Verifies the page loads successfully
2. ✅ **Page Title** - Checks correct page title is set
3. ✅ **Destinations Grid** - Confirms all destination cards render
4. ✅ **Filter Functionality** - Tests location and price filtering
5. ✅ **Modal Interactions** - Opens and closes destination detail modals
6. ✅ **Responsive Design** - Tests 4 breakpoints (mobile, tablet, desktop, large desktop)
7. ✅ **Feature Detection** - Verifies HTML feature classes are added correctly
8. ✅ **Navigation Links** - Checks all navigation elements exist

### Test Results

After running tests, you'll see a summary like:

```
📊 TEST SUMMARY
============================================================
✅ chrome          - PASSED
✅ firefox         - PASSED
✅ edge            - PASSED
============================================================
Total: 3/3 browsers passed
```

### Testing Tools

- **Selenium WebDriver**: Browser automation framework for local testing
- **http-server**: Simple HTTP server for serving the application during tests
- **Platform Detection**: Automatically tests appropriate browsers for your OS

### Troubleshooting

**Port 8080 already in use:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080
```

**Edge driver not found:**

- Ensure `msedgedriver.exe` is in the `drivers/` folder
- Verify the driver version matches your Edge browser version
- The `drivers/` folder is git-ignored, so you'll need to set it up on each machine

**Tests timing out:**

- Check your internet connection
- Increase timeout values in test files if needed
- Ensure no firewall is blocking localhost:8080

See [tests/README.md](tests/README.md) for detailed testing documentation.

### Cloud Testing with BrowserStack

Test on real devices and browsers in the cloud:

**Setup:**

1. Sign up at [BrowserStack](https://www.browserstack.com/)
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

**Run tests:**

```bash
npm run test:browserstack
```

**Tested Configurations:**

- Desktop: Chrome, Firefox, Edge (Windows 11), Safari (macOS)
- Mobile: iPhone 14 Pro, Samsung Galaxy S23, iPad Pro
- Legacy: Internet Explorer 11 (Windows 10)

View live test results at: https://automate.browserstack.com/dashboard

## Manual Cross-Browser Testing

To test cross-browser compatibility manually:

1. **Feature Detection**: Open browser console and check HTML classes added by `feature-detection.js`
2. **Legacy Browsers**: Test in IE11 or use browser dev tools to emulate older browsers
3. **Mobile Devices**: Test on real iOS/Android devices or use browser responsive mode
4. **Vendor Prefixes**: All modern CSS properties include appropriate vendor prefixes
5. **Fallback Styles**: Check `css/fallbacks.css` for legacy browser alternatives
