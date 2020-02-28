//server.js
const io = require('socket.io')();
const fs = require('fs');

const detectCategories = () => {
  let categories = [];
  fs.readdirSync('./public/sounds/').forEach(file => {
    categories.push(file);
  });
  return categories;
}

const detectSounds = (soundsFolder) => {
  let sounds = [];
  try {
    fs.readdirSync(soundsFolder).forEach(file => {
      sounds.push(file);
    });
    console.log('fs() success');
    return sounds;
  }
  catch {
    console.log('et oui, c\'est l\'erreur de votre vie');
    sounds = false;
    return sounds;
  }
}

io.on('connection', function(socket){

  console.log('a user connected');
  let categories = detectCategories();
  console.log('Catégories détectées : ' + categories);
  socket.emit('categories', categories);

  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });

  socket.on('category', function (category) {
      console.log('catégorie choisie : ' + category);
      const soundsFolder = './public/sounds/' + category;
      let sounds = detectSounds(soundsFolder);
      socket.emit('sounds', sounds);
  });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
