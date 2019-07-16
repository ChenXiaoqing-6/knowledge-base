function generateMockData() {
  const provider = "mindtouch",
    content = "This guide provides an overview of product features and related technologies",
    lastUpdated = "2016-12-16T06:18:26Z",
    link = "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide",
    renderType = "IFRAME",
    renderValue = "https://sapdemo-responsive.mindtouch.us/Workstations/test_guide?mt-f1=true&mt-view=f1",
    views = 125,
    author = "James Bond",
    category = "",
    upvotes = 23,
    devotes = 0,
    tag = ["troubleshooting", "coffee maker"];
  const mockData = [];
  const articleTag = ["angular", "node", "java"];
  for (let id = 1; id <= 150; id++) {
    mockData.push({
      id: `${id}`,
      provider: provider,
      title: `mockArticle:${id}-${articleTag[parseInt((id-1)/50)]}:${id-50*parseInt((id-1)/50)}`,
      content: content,
      lastUpdated: lastUpdated,
      link: link,
      renderType: renderType,
      renderValue: renderValue,
      views: views,
      author: author,
      category: category,
      upvotes: upvotes,
      devotes: devotes,
      tag: tag
    })
  }
  return {
    data: mockData
  };
}
module.exports = generateMockData;
