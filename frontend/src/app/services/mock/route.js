function router() {
  return {
    "/data?search=:search&page=:page&pageSize=:pageSize": "/data?q=:search"
  }
}
module.exports = router;
