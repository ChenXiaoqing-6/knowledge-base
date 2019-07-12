const jsonServer = require("json-server");
const $mockDB = require("./mockDB");
const $db = $mockDB();
const $routeHandler = require('./route');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(jsonServer.rewriter($routeHandler($db)));
const router = jsonServer.router($db);

function geturl(name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

router.render = (req, res) => {
  var totalObjectCount = res.locals.data.length;
  var currentPage = geturl("page", req.originalUrl);
  var pageSize = geturl("pageSize", req.originalUrl);
  var lastPage = Math.ceil(totalObjectCount / pageSize);
  var data;
  if ((currentPage - 1) * pageSize >= totalObjectCount) data = [];
  else if (currentPage * pageSize <= totalObjectCount) data = res.locals.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  else data = res.locals.data.slice((currentPage - 1) * pageSize, totalObjectCount);
  res.jsonp({
    body: {
      data: data,
      pageSize: pageSize,
      currentPage: currentPage,
      lastPage: lastPage,
      totalObjectCount: totalObjectCount
    }
  })
}

server.use(router);
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.listen(3211, () => {
  console.log("mock server is running at 3211");
})
