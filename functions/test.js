

const webScrapping = require("./fetchVocabs.js");//inside it uses a callback to wait for node-fetch to load since it doesnt support commonjs require
webScrapping('https://quizlet.com/636040819/apush-chapter-21-vocab-flash-cards/').then(result=> console.log(result));

