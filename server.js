const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: "https://twitter-frontend-ss7ffpmui-harsha-9977s-projects.vercel.app",
  credentials: true
}));

app.use(express.json());

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
const mongodbURI = process.env.MONGODB_URI;

connectDB();

// Function to fetch data from Twitter with rate limit handling
const fetchDataFromTwitter = () => {
  const tweetIds = '1602297284962197504,1437728605951420421'; // Example Tweet IDs

  axios.get('https://api.twitter.com/2/tweets', {
    params: {
      ids: tweetIds
    },
    headers: {
      'Authorization': `Bearer ${twitterBearerToken}`
    }
  })
  .then(response => {
    console.log('Tweet data:', response.data);
    // Add your logic to process the Twitter data (e.g., store in the database)
  })
  .catch(error => {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded, retrying after delay...');
      // Retry the request after 15 minutes (900000 ms)
      setTimeout(() => {
        fetchDataFromTwitter(); // Retry the request after the delay
      }, 900000); // Wait 15 minutes before retrying
    } else {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  });
};

// Call the function to fetch data
fetchDataFromTwitter();

const twitterRoutes = require('./routes/twitter');
app.use('/api/twitter', twitterRoutes);

// Scheduler (this could be a job scheduler like cron to automate tasks)
require('./utils/scheduler');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
