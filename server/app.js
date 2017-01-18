const chalk = require('chalk');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path');
const PATHS = {
  indexHTML: path.join(__dirname, '../browser/build/index.html'),
  build: path.join(__dirname, '../browser/build')
}
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging')
  require('dotenv').config();

// Logging, static, cookie-parser, and auth checking middleware
app.use(morgan('dev'));
app.use(express.static(PATHS.build));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(require('./config/authed'));

// Handle API and all browser requests
app.use('/api', require('./routes'));
app.get('/*', (req, res) => res.sendFile(PATHS.indexHTML));

// Error handler
app.use((err, req, res, next) => {
  console.error(chalk.red(err));
  if (err.stack) console.error(chalk.red(err.stack))
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// Start server
app.listen(PORT, () =>
  console.log(chalk.blue(`Server started on port ${chalk.magenta(PORT)}`))
);

module.exports = app;
