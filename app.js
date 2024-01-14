const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Custom middleware to log request information
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next(); // Call the next middleware in the stack
});

// Use morgan for enhanced request logging
app.use(morgan('dev'));

// Middleware to parse incoming POST requests
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming POST requests
app.use(express.urlencoded({ extended: true }));

// Define routes

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.post('/submit', (req, res) => {
  // Log form data to the console
  console.log('Form Data:', req.body);

  // Send a simple success response
  res.send('Form submitted successfully!');
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.render('user', { title: 'User Profile', userId });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle the '/download' route
app.get('/download', (req, res) => {
    const filePath = __dirname + '/public/sample.jpg';
    res.download(filePath, 'sample.jpg', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

