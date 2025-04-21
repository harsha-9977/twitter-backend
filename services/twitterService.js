const axios = require('axios');
require('dotenv').config();

const fetchTwitterMetrics = async () => {
  const url = 'https://api.twitter.com/2/users/by/username/elonmusk?user.fields=public_metrics';

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  });

  const metrics = response.data.data.public_metrics;

  return {
    followers: metrics.followers_count,
    tweets_count: metrics.tweet_count,
    listed_count: metrics.listed_count,
  };
};

module.exports = { fetchTwitterMetrics };
