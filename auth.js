require('dotenv').config();

const validateApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey && apiKey === process.env.API_KEY) {
        next(); // Allow the request if the API key is valid
    } else {
        console.log(process.env.API_KEY);
        res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};

module.exports = validateApiKey;
