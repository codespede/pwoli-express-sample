var express = require('express');
var expressLayouts = require('express-ejs-layouts');
const queryString = require('querystring');
const pwoli = require('pwoli');
const app = express();
const sequelize = require("../models")
pwoli.Application.setViewPath('views')

const Company = require('../models/Company');
const Event = require('../models/Event');
var router = express.Router();
router.use('/static', express.static('static'));
app.use('/', express.static('public'));
router.use(expressLayouts);

router.use((req, res, next) => { //middleware to assign the current request to Pwoli.
  pwoli.Application.request = req;
  pwoli.Application.view.setLayout('/layouts/main.ejs');
  next();
})
//sequelize.sync()
/* GET home page. */
router.get('/items/list', async function (req, res, next) {
  const filterModel = new Company();
    const dataProvider = filterModel.search(pwoli.DataHelper.parseUrl(req.url));
    console.log('dp-orma', dataProvider.ormAdapter)
  dataProvider.query.include = [{ model: Event, as: 'event' }];
  let sort = dataProvider.getSort();
  
  sort.attributes['event.title'] = {
      asc: ['event', 'title', 'asc'],
      desc: ['event', 'title', 'desc'],
  };
  dataProvider.setSort(sort);
  const grid = new pwoli.GridView({
    dataProvider,
    filterModel,
    columns: [
      { class: pwoli.CheckboxColumn },
      { class: pwoli.RadioButtonColumn },
      { class: pwoli.SerialColumn },
      'id',
      'title',
      {
          attribute: 'event.title',
          label: 'Event Title(Related column)',
          //value: (model) => model?.title + '..',
      },
      {
          attribute: 'getter',
          filter: false,
      },
      {
          label: 'Sample',
          value: (model, attribute) => model.sampleFunc(attribute),
      },
      { class: pwoli.ActionColumn, route: 'items' /*visibleButtons: { update: false }*/ },
    ],
    options: {
      id: 'my-grid',
    },
  });

  if (req.headers['x-requested-with'] === 'XMLHttpRequest')
      content = await pwoli.Application.view.render('/_grid.ejs', { grid, company: new Company() }, false); //rendering just the grid.ejs without layout if it's a Pjax request.
  else content = await pwoli.Application.view.render('/grid.ejs', { grid, company: new Company() });

  //res.render('index', { title: 'Pwoli Express Sample App', grid: await grid.render() }) //Express's native way to render the view without Pwoli's custom headers
  return pwoli.Application.respond(res, content); //Recommended way as this method allows `await` calls inside views.
});
const postHandler = async function (req, res, next) { // if the route is "items/create" or "items/update"
  const company = req.url.includes('items/create')
                ? new Company()
                : await Company.findOne({ where: { id: req.params.id } });
  console.log('company-test', company);
    if (req.method === 'POST') {
        const post = await pwoli.DataHelper.parseQueryParams(req.body);
        //console.log('post', await pwoli.DataHelper.parseQueryParams((post)), post);
    if (req.headers['x-requested-with'] === 'XMLHttpRequest' && company.load(post)) { //If it's an ajax validation request sent by ActiveForm
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(await ActiveForm.validate(company)));
        res.end();
        return;
    }
        console.log('before-load', company.load(post))
    if (company.load(post) && (await company.verify())) {
        console.log('loaded and verified')    
        await company.save();
        return res.redirect('/items/list');
    }
  }
  const form = new pwoli.ActiveForm();
  await form.initialization;
    const eventsList = {};
    (await Event.findAll()).forEach(event => { eventsList[event.id] = event.title } );
    console.log('eventsList', eventsList);
  //Recommended way to render a view with layout if the view has async function calls.
  return pwoli.Application.respond(res, await pwoli.Application.view.render('/form.ejs', { form, company, eventsList }));
  
  // Below will work but 'express-ejs-layouts' package won't work in this case and you'll have to wrap this with the layout explicitly.
  // res.send(await new Promise((resolve, reject) => { 
  //   res.render('form', { form, company, async: true }, async (err, html) => {
  //     console.log('html', await html);
  //     resolve(await html);
  //   });
  // }));

  // Recommended way to render a view with layout if the view doesn't have async function calls.
  // return pwoli.Application.respond(res, (res) => res.render('form', { form, company, async: true }));
}
router.all('/items/create', postHandler);
router.all('/items/update/:id/', postHandler);

router.get('/items/delete/:id', async function (req, res, next) {
    await Company.destroy({ where: { id: req.params.id } });
});

router.get('/items/api', async function (req, res, next) {
    const filterModel = new Company();
    const dataProvider = filterModel.search(pwoli.DataHelper.parseUrl(req.url));
    dataProvider.query.include = [{ model: Event, as: 'event' }];
    let sort = dataProvider.getSort();
    //console.log('dp-sort', sort)
    sort.attributes['event.title'] = {
        asc: ['event', 'title', 'asc'],
        desc: ['event', 'title', 'desc'],
    };
    dataProvider.setSort(sort);
    //If you want to add custom fields to the JSON response for each model, just do like below:
    const models = await dataProvider.getModels();
    for (let model of models) {
        model.setAttributeValues({
            myGetter: await model.getter, //getter is a custom `getter` written in Company model.
            // model.dataValues.anotherField = anotherValue;
        });
        console.log('api-model', model);
    }
    await dataProvider.setModels(models);

    pwoli.Application.respond(res, dataProvider);
});

module.exports = router;
