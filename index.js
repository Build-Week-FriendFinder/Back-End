const server = require('./api/server.js');

server.get('/', (req, res)=>{
    res.status(200).send({ message: 'Welcome!' })
  })

server.all('*', (req,res)=>{
    res.status(404).send({ message: "How did you get here?" })
  })

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

module.exports = server;