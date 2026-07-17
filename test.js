const https = require('https');
https.get('https://visika-frontend.vercel.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Categories count:', data.split('/categories/').length - 1);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
