const express = require('express');
const session = require('express-session');
const passport = require('./auth/passport');
const path = require('path');
const api_routes = require('./backend_routes/api_routes');
const auth_routes = require('./backend_routes/auth_routes');
const { sequelize } = require('./models');
const { session_secret } = require('./config');
const PORT = process.env.PORT || 5000;

const app = express();

// Give the client/browser access to front end files
// This is ONLY way the browser can access anything in your file/folder
// structure
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: session_secret,
  resave: false,
  saveUninitialized: true
}));
// Passport Strategy must be setup to handle what type of login you
// will use
app.use(passport.initialize());
app.use(passport.session());

// Attach any API/Data/Auth routes to the server
// MUST come before the catch all route
app.use(api_routes);
app.use(auth_routes);

// Make sure any wildcard routes the browser visits are
// handled by React Router
// Catch All Route -- catches any other route that's not setup
// and will send the react index.html file, so React can handle
// the view routes
app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('Listening on port %s', PORT));
  });