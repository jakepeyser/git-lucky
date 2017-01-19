const requireHacker = require('require-hacker');

// Replace inline SVG elements with empty React components
const reactNullComponent = `
  require('react').createClass({
    render() {
      return null;
    }
  })
`
requireHacker.hook('svg', () => `module.exports = ${reactNullComponent}`)
