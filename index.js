const PORT = 8000;

import got from 'got'
import bodyParser from 'body-parser'
import express from 'express'
import cheerio from 'cheerio'

const urlencodedparser = bodyParser.urlencoded( {extended: false})

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {driverName: '', driverConstructor: ''})
})

app.post('/send-url', urlencodedparser, (req, res) => {
    scrapeURL(req, res)
})

async function scrapeURL(req, res){
    let url = req.body.myurl
    const response = await got(url)
    const $ = cheerio.load(response.body)
    console.log($)

    let driverName = $('h1').html()
    let driverConstructor = $('.stat-value').html()

    res.render('index', {driverName: driverName, driverConstructor: driverConstructor})
}

app.listen(PORT, () => {console.log(`Server listening on PORT ${PORT}`)})


