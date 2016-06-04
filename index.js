'use strict';

// Babel6 does not hack the default behaviour of ES Modules anymore, so we should export
const HeightReporter = require('./src/ReactHeightReporter.js').default;

module.exports = ReactHeight;