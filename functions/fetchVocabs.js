
const cheerio = require('cheerio');
const axios = require('axios').default;
var fetchFunction, callback, linkUrlGlobal;

module.exports = (async (url) => {
  console.log("url"+ url);
  var response =null;
    try {
     
       response = await axios.get(url,{ headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
          'Accept-Language':'en-US',
          'Accept-Encoding':'gzip, deflate',
          'Accept':'text/html',
          'Referer':'http://www.google.com/'
         } 
         } );
       console.log("resonse from website");
      
  } catch (err) {
      // Handle Error Here
      console.error(err);
      console.log("ohno, error!");
      return {data:"error", errorMessage:err};
  }
    
   
   // using await to ensure that the promise resolves
   const body = response.data;
   const $ = cheerio.load(body);




   const results = {
     title: ($('.UIHeading--one').text()),

     sets: []
   }
   $.html();
   $('.SetPageTerm-content').each(function () {
     var set = [];
     $(this).find(".TermText").each(function () {
       set.push($(this).text());
     })
     results.sets.push(set);

   });
   return results;
   //=> <html><head></head><body><ul id="fruits">...</ul></body></html>
   // parse the html text and extract titles
   // const $ = cheerio.load(body);



 });
 if(callback){
   fetchFunction(linkUrlGlobal).then(vocabDataObj => callback(vocabDataObj));

 }
// use import because cant use ES6 for firebase 
//so callback to wait for node-fetch to load
/*
module.exports = function(url,cb){
  if(typeof fetchFunction != 'undefined'){
    
    console.log("resolved");
    fetchFunction(url).then(vocabDataObj => cb(vocabDataObj));//used to be cb(fetchFunction()), which just gives a promise
  } 
  else{
    linkUrlGlobal = url;
    callback = cb;
  }
}
import('node-fetch').then(async ({ default: fetch }) => {
 fetchFunction = (async (url) => {
   console.log("url"+ url);
    const response = await fetch(url);
    // using await to ensure that the promise resolves
    const body = await response.text();
    const $ = cheerio.load(body);




    const results = {
      title: ($('.UIHeading--one').text()),

      sets: []
    }
    $.html();
    $('.SetPageTerm-content').each(function () {
      var set = [];
      $(this).find(".TermText").each(function () {
        set.push($(this).text());
      })
      results.sets.push(set);

    });
    return results;
    //=> <html><head></head><body><ul id="fruits">...</ul></body></html>
    // parse the html text and extract titles
    // const $ = cheerio.load(body);



  });
  if(callback){
    fetchFunction(linkUrlGlobal).then(vocabDataObj => callback(vocabDataObj));

  }
})
*/

