const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/ideas', async (req, res) => {
    const { pageNumber = 1, pageSize = 10, sort = '-published_at' } = req.query;
    const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Kirim data kembali ke klien
        res.json(data);
    } catch (error) {
        console.error('Error fetching ideas:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
