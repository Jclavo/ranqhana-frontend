const express = require('express');

const app = express();

const languageList = ['en','es','pt'];

// Serve only the static files form the dist directory
app.use(express.static('./dist/'));
// app.use(express.static('./dist/en'));
// app.use(express.static('./dist/es'));
// app.use(express.static('./dist/pt'));

// server.all('*', function (req, res, next) {
//     var l = /^\/(en|zh)/i;
//     if (l.test(req.url)) {
//         var a = l.exec(req.url);
//         var local = a[1];
//         i18n.setLocale(local);
//         res.setLocale(local);
//     } else {
//         i18n.setLocale('zh');
//         res.setLocale('zh');
//     }
//     next();
// });

app.get("/:lang*?/*", function (req, res) {
    var lang = req.params.lang;
    if (!languageList.includes(lang)) {
        lang = req.headers["accept-language"].slice(0,2);
    }
    res.sendFile(path.join(__dirname, '/dist/'+ lang +'/index.html'));
});

// app.get('/assets', function (req, res) {
//     // res.sendFile(path.join(__dirname, '/dist/{{your-app-name}}/assets'));
//     var lang = req.params.lang;
//     if (!languageList.includes(lang)) {
//         lang = "en"
//     }
//     res.sendFile(path.join(__dirname, '/dist/'+ lang +'/assets'));
// });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);