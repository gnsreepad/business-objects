const getPageLinks = () => {
    const data = JSON.stringify({
        query: `{
          getPageLinks(pageId: "4605c0a6-8bf3-4a49-a13f-2bd77194cce0"){
            pageId,
            title,
            linkUrl
          }
        }`,
      });
    return data;
}