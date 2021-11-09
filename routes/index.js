var express = require('express');
var expressLayouts = require('express-ejs-layouts');
const pwoli = require('pwoli');
const app = express();
pwoli.Application.setViewPath('views1')
console.log('pwoli-app', pwoli.Application);
const Company = require('../models/Company');
var router = express.Router();
router.use('/static', express.static('static'));
router.use(expressLayouts);
router.use((req, res, next) => {
  pwoli.Application.request = req;
  next();
})

/* GET home page. */
router.get('/', async function (req, res, next) {
  const filterModel = new Company();
  console.log('fm', filterModel)
  const dataProvider = filterModel.search(pwoli.DataHelper.parseUrl(req.url));
  const grid = new pwoli.GridView({ dataProvider, filterModel, columns: ['id', 'title'] });
  const renderedGrid = await grid.render()

  //res.render('index', { title: 'Pwoli Express Sample App', renderedGrid }) //Express's native way to render the view without Pwoli's custom headers
  pwoli.Application.respond(res, (res) => res.render('index', { title: 'Pwoli Express Sample App', renderedGrid })); //Recommended: Put the same above line inside a callback in this line to respond with Pwoli's custom headers
});

module.exports = router;
