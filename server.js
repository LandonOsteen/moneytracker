// server.js

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/legislators/:stateAbbreviation', async (req, res) => {
  try {
    const stateAbbreviation = req.params.stateAbbreviation;
    const apiKey = '09aeb7cde64dd3099d9006e148af6443';
    const apiUrl = `http://www.opensecrets.org/api/?method=getLegislators&id=${stateAbbreviation}&apikey=${apiKey}&output=JSON`;

    const response = await axios.get(apiUrl);
    const legislators = response.data.legislator;

    res.json({ legislators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
