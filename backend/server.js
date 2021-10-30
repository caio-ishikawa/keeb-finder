const express           = require('express');
const cors              = require('cors');
const Axios             = require('axios');
const cheerio           = require('cheerio');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Gets all available keyboards from mykeyboard.eu (first page only) //
app.get('/data', (req, res) => {
    const MyKeyboardEU = 'https://mykeyboard.eu/catalogue/category/mechanical-keyboards_3/?selected_facets=num_in_stock_exact%3A%5B1+TO+%2A%5D';
    const CandyKeys = 'https://candykeys.com/category:mechanical-keyboards/brand:all/keyboard-size:all/colors:all/switches:all/led:all/layout:all/stock:in-stock';
    const MKEUResults = [];

    // Gets in-stock results from mykeyboard.eu //
    Axios.get(MyKeyboardEU)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let keyboards = $('.thumbnail')

            for (var i = 0; i < keyboards.length; i++) {
                MKEUResults.push(keyboards[i].attribs.alt);
            }

            res.send(MKEUResults);
        })
        .catch((err) => res.send(err));
});

app.get('/candy', (req, res) => {
    const CandyKeys = 'https://candykeys.com/category:mechanical-keyboards/brand:all/keyboard-size:all/colors:all/switches:all/led:all/layout:all/stock:in-stock';

    Axios.get(CandyKeys)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let keyboards = $('.price');
            console.log(keyboards);
        })
        .catch((err) => res.send(err));
    
});

// Gets all available Ducky keyboards from keygem //
app.get('/keygem_ducky', (req, res) => {
    const KeyGemDucky = 'https://keygem.store/collections/ducky';
    const duckyRes = [];

    // Gets DUCKY keyboards //
    Axios.get(KeyGemDucky)
        .then((response) => {
            let $ = cheerio.load(response.data);
            // loops over all h2 tags and adds Ducky keyboards to array //
            $('h2').each(function(i, elm) {
                let str = $(this).text().trim();
                if (str.includes("Ducky")) {
                    duckyRes.push(str);
                }
            })
            res.send(duckyRes);
        })
        .catch((err) => res.send(err));

});

app.get('/keygem_gmmk', (req, res) => {
    const KeyGemGMMK = 'https://keygem.store/collections/glorious';
    const GMMKRes = [];

    // Gets GMMK keyboards //
    Axios.get(KeyGemGMMK)
    .then((response) => {
        let $ = cheerio.load(response.data);

        // loops over all h2 tags and adds Ducky keyboards to array //
        $('h2').each(function(i, elm) {
            let str = $(this).text().trim();
            if (str.includes("Glorious")) {
                GMMKRes.push(str);
            }
        })
        res.send(GMMKRes)
    })
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
