const router = require("express").Router();
const dns = require("dns");
var UrlShortcuts = [];
var count = -1;

router.post("/shorturl", async (req, res) => {
    const urlPattern = /^https\:\/\/\w+\.\w+\.\w+$/
    const Url = req.body.url;
    let rawUrl;
    console.log(`Url:${Url}||Pattern:${!urlPattern.test(Url)}`);

    if (!urlPattern.test(Url))
    {
        res.json({"error": "invalid url"});
        return;
    }

    const FoundShortcut = UrlShortcuts.find((item, index) => { return item.original_url == Url});

    if (FoundShortcut)
    {
        res.json(FoundShortcut);
        return;
    }

    rawUrl = Url.slice(8);
    console.log(rawUrl);

    dns.lookup(rawUrl, (err, address, family) => {
        if (err)
        {
            res.json({"error": "Invalid URL"});
            return;
        }
        UrlShortcuts[++count] = {"original_url": Url, "short_url": count};
        res.json(UrlShortcuts[count]);
    });
})

router.get("/shorturl/:short_url?", (req, res) => {
    const shortUrl = parseInt(req.params.short_url);

    const FoundShortcut = UrlShortcuts.find((item, index) => { return item.short_url == shortUrl});

    if (!FoundShortcut)
    {
        res.json({"error": "No short URL found for the given input"});
        return;
    }
    
    res.redirect(FoundShortcut.original_url);
});

module.exports = router;