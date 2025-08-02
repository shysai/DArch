const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (PDFs, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route: Home Page
app.get('/', (req, res) => {
    const pdfFolder = path.join(__dirname, 'public', 'pdfs');

    // Read all PDF files in the folder
    fs.readdir(pdfFolder, (err, files) => {
        if (err) {
            console.error('Failed to read PDF directory:', err);
            return res.send('Error loading library');
        }

        // Filter PDF files only
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));

        // Render index.ejs and pass list of PDFs
        res.render('index', { pdfFiles });
    });
});

app.listen(PORT, () => {
    console.log(`Digital Library is running at http://localhost:${PORT}`);
});
