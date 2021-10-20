const sendRequest = async (data) => {
    const response = await fetch(
        'http://localhost:5000/sales-force/api/graphql',
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
    return json;
    // return JSON.stringify(json);
}