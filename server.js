const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
const mongodbURI = process.env.MONGODB_URI;


connectDB();

// Routes will go here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const twitterRoutes = require('./routes/twitter');
app.use('/api/twitter', twitterRoutes);

// Scheduler
require('./utils/scheduler');

const axios = require('axios');

// Replace with actual public tweet IDs (these are just for testing)
const tweetIds = '1602297284962197504,1437728605951420421'; // Elon Musk, NASA

axios.get('https://api.twitter.com/2/tweets', {
    params: {
        ids: tweetIds
    },
    headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
})
.then(response => {
    console.log('Tweet data:', response.data);
})
.catch(error => {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
});


