import fetch from "node-fetch";

(async function () {
    const data = JSON.stringify({
      query: `{
        getPageLinks(pageId: "4605c0a6-8bf3-4a49-a13f-2bd77194cce0"){
          pageId,
          title,
          linkUrl
        }
      }`,
    });

    const response = await fetch(
      'http://localhost:4000/product-x/api/graphql',
      {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
          Authorization:
            'Apikey DONOTSENDAPIKEYS',
        },
      }
    );

    const json = await response.json();
    console.log(json);

    console.log(json.data.getPageLinks);
    // document.getElementById('code').innerHTML = js_beautify(
    //   JSON.stringify(json.data)
    // );
    // Prism.highlightAll();
  })();