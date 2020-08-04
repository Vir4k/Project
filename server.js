const express = require('express');

module.exports.run = () => {  
  const server = express();
  
  server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
  });
  server.listen(3000, ()=>{console.log("Server is Ready!")});
}
