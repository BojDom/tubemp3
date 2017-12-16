const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const config = require('./tpl');
const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const ioClient = require('socket.io-client'),
  jwt = require('jsonwebtoken');

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();

var ioc = ioClient.connect(process.env.TELEGRAM_URL, {
  secure:true,
  'query': 'token=' + jwt.sign({ name: 'TubeMp3 ', env :process.env.NODE_ENV }, process.env.JWT_KEY, { algorithm: 'HS512'})
});
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8');

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,

    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),

    basedir: resolve('./dist'),

    runInNewContext: false
  }));
}

let renderer;
let readyPromise;
if (isProd) {
  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('domi/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge:/* cache && isProd ? 60 * 60 * 24 * 30 :*/ 0
});

app.use(compression({ threshold: 0 }));
app.use(favicon('./public/logo-48.png'));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./'+config.static, true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
});

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = req => useMicroCache;

function render (req, res) {

  const s = Date.now();
  /* da togliere queste tre righe */
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);

  const handleError = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`);
      }
      return res.end(hit);
    }
  }

  const context = {
    title: 'TubeMp3.co', // default title
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    const bodyOpt = { body: true }
    const {
      title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta
    } = context.meta.inject()
    
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});


const https = require('https');

var PORT = process.env.PORT || 9111;

https.createServer({
    cert: fs.readFileSync(process.env.cert),
    key : fs.readFileSync(process.env.pkey)
  }, app).listen(PORT,'0.0.0.0', () => {
  console.log(`server started at 0.0.0.0:${PORT} mode ${process.env.NODE_ENV}`);
});