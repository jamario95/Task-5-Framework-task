class HomePage {

    async open(){
        await browser.url('https://cloud.google.com/');
    }
}

module.exports = HomePage;