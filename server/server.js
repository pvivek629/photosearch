

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/api/images', async (req, res) => {
  try {
    const { query, page } = req.query;
    const perPage = 10;
    const accessKey = 'foW53BDc17GpHshU5wvheO-Af884fYpcgrn_iGEmXN0'; 

    
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${query}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
