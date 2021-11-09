const puppeteer = require("puppeteer");

module.exports=( async function scrape() {
    const url = 'https://quizlet.com/407384156/algebra-ii-semester-2-final-not-finished-flash-cards/?x=1jqt';
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    // TODO: click "Alle Aktionen laden"

    const promotions =  await page.evaluate(() => {
       
      
        
        const textContent = (elem) => elem ? elem.textContent.trim() : ''; // helper function
        const results = {
            title: textContent(document.querySelector('.UIHeading--one')),
            sets:[]
        }
       var sets = document.querySelectorAll(".SetPageTerm-content");
       sets.forEach(element => {
           results.sets.push([
               element.querySelectorAll(".TermText")[0].textContent,     element.querySelectorAll(".TermText")[1].textContent
           ]);
       });
      
    //can use query selector all to get a list of vocab elements
        return results;
        });
    console.log(promotions);
    await browser.close();
    return promotions;
});