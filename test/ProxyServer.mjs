//import express from 'express';
import fetch from 'node-fetch';
// You can remove 'request-ip' if it's not being used
// import requestIp from 'request-ip';

const app = express();

// Here's where you would add the apiRoutes setup
const apiRoutes = express.Router();
apiRoutes.get('/nigeria-time', async (req, res) => {
  const nigeriaIp = '41.203.78.171';
  const apiKey = '9109BBB3F3E1C86A340F7B5BEC36D8D1'; // Ensure this is correct
  
  // console.log(`Fetching data for IP: ${nigeriaIp}`); // Log what IP you're querying
  // console.log(`Using API key: ${apiKey}`); // Log the API key (be cautious with this in production)
  try {
    const response = await fetch(`https://api.ip2location.io/?key=${apiKey}&ip=${nigeriaIp}&format=json`);
    console.log('Response status:', response.status); // Log the status of the response
    console.log('Response headers:', response.headers); // Log headers
    
    if (!response.ok) {
      console.error('API response not OK:', response.statusText);
      throw new Error(`External API response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data received:', JSON.stringify(data, null, 2)); // Log the actual data
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


// Mount the apiRoutes under /api
app.use('/api', apiRoutes);

// Serve static files after API routes
app.use(express.static('public')); // Serve static files

// Add CORS middleware here
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Use your specific domain in production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));