// scheduler.js
const axios = require('axios');
const cron = require('node-cron');

// Function to wait for a specific amount of time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchTwitterMetrics() {
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            const response = await axios.get('https://api.twitter.com/2/users/by/username/elonmusk?user.fields=public_metrics', {
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
                }
            });

            console.log('Twitter Metrics:', response.data);
            return response.data;  // Exit if request is successful

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(`Rate limit exceeded. Retrying after 1 minute...`);
                await sleep(60000);  // Wait for 1 minute before retrying
                retryCount++;
            } else {
                console.error('Error fetching data:', error.message);
                break;
            }
        }
    }
}

// Schedule the task to run every 15 minutes
cron.schedule('*/15 * * * *', fetchTwitterMetrics);
