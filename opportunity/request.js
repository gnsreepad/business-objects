function createOpportunityRequest() { 
	// @ts-ignore
	const formData = Array.from(document.querySelectorAll('#CreateContact input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
    console.log(formData);
    const createOpportunityInput = {}
    // @ts-ignore
    if (formData.name){createOpportunityInput.name = formData.name}
    // @ts-ignore
    if (formData.account){createOpportunityInput.account =formData.account}
    // @ts-ignore
    if (formData.winPercentage){createOpportunityInput.winPercentage = parseFloat(formData.winPercentage)}
    // @ts-ignore
    if (formData.estimatedRevenue){createOpportunityInput.estimatedRevenue = formData.estimatedRevenue}
    // @ts-ignore
    if (formData.riskLevel){createOpportunityInput.riskLevel = formData.riskLevel}

    console.log(createOpportunityInput);
	
	const data = createOpportunity(createOpportunityInput);
    fetch(
        'http://localhost:5000/sales-force/api/graphql',
        {
          method: 'post',
          body: data,
          // @ts-ignore
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            Authorization:
              'Apikey DONOTSENDAPIKEYS',
          },
        }
      )
	.then(response => response.json())
    .then(result => {
        console.log(result);
        document.getElementById('tablename').innerText = result?.data?.createOpportunity?.id || 'Unable to Add Contact';
    })
    .catch(function (err) {
        console.log(err);
      });
	return false;
}

function updateOpportunityRequest() { 
	// @ts-ignore
	const formData = Array.from(document.querySelectorAll('#UpdateContact input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
    console.log(formData);
	const createOpportunityInput = {}
    // @ts-ignore
    if (formData.name){createOpportunityInput.name = formData.name}
    // @ts-ignore
    if (formData.winPercentage){createOpportunityInput.winPercentage = parseFloat(formData.winPercentage)}
    // @ts-ignore
    if (formData.estimatedRevenue){createOpportunityInput.estimatedRevenue = formData.estimatedRevenue}
    // @ts-ignore
    if (formData.riskLevel){createOpportunityInput.riskLevel = formData.riskLevel}

    // @ts-ignore
    if (formData.closeDate){createOpportunityInput.closeDate = formData.closeDate}

    console.log(createOpportunityInput);

    // @ts-ignore
    const account= formData.account;
	
	const data = updateOpportunity(account, createOpportunityInput);
    fetch(
        'http://localhost:5000/sales-force/api/graphql',
        {
          method: 'post',
          body: data,
          // @ts-ignore
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            Authorization:
              'Apikey DONOTSENDAPIKEYS',
          },
        }
      )
	.then(response => response.json())
    .then(result => {
        console.log(result);
        document.getElementById('updateOppo').innerText = (result?.data?.updateOpportunity?.id) ? 'Updated' : 'Unable to Update';
    })
    .catch(function (err) {
        console.log(err);
      });
	return false;
}