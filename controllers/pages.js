const home = (req, res) => {
    res.render('index.ejs', {title: 'CookBook'})
}

module.exports = {
    home,
}