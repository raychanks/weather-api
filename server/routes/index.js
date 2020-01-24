const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const { openWeatherUrl } = require('../config');
const { getDb } = require('../db');

const { TOKEN_SECRET } = process.env;
const router = express.Router();

router.get('/weather', async function(req, res) {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(403).send('Unauthorized');
  }

  const tokenWithoutBearer = token.slice(7);

  try {
    jwt.verify(tokenWithoutBearer, TOKEN_SECRET);
  } catch (err) {
    return res.status(403).send('Unauthorized');
  }

  const weatherRes = await axios.get(openWeatherUrl);
  const db = await getDb();
  const col = db.collection('weather');

  if (weatherRes.status === 200) {
    await col.insertOne(weatherRes.data);

    res.send(weatherRes.data);
  } else {
    // get data from our db instead
    const data = await col
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .project({ _id: 0 })
      .toArray();

    res.send(data[0]);
  }
});

router.get('/token', async function(req, res) {
  const token = jwt.sign({}, TOKEN_SECRET, { expiresIn: '1h' });

  res.send({ token });
});

module.exports = router;
