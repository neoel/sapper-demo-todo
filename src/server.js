import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import session from 'express-session';
import bodyParser from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    bodyParser.json(),
    session({
      secret: 'no-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
    }),
    sapper.middleware({
      session: (req, res) => ({
        todos: req.session.todos
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
