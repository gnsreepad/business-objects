
function generateTable(obj, elementid) {
    var tbody = document.getElementById(elementid);
  
  for (var i = 0; i < obj.length; i++) {
      var tr = "<tr>";
  
      /* Verification to add the last decimal 0 */
      if (obj[i].name.toString().substring(obj[i].name.toString().indexOf('.'), obj[i].name.toString().length) < 2) 
          obj[i].name += "0";
  
      /* Must not forget the $ sign */
      tr += "<td>" + (i+1) + "</td>"+ "<td>" + obj[i].email + "</td>" + "<td>" + obj[i].name.toString() + "</td></tr>";
  
      /* We add the table row to the table body */
      tbody.innerHTML += tr;
  }
  }
  

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




function opportunityByName() { 
	// @ts-ignore
	const name = document.getElementById('name').value
    console.log(name);
	
	const data = getOpportunityByName(name);
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
        console.log(result?.data?.getOpportunityByName?.name);
        document.getElementById('tablename').innerText = result?.data?.getOpportunityByName?.name || "No contact of this name";
        document.getElementById('winPercentage').innerText = result?.data?.getOpportunityByName?.winPercentage || "Nil";
        document.getElementById('account').innerText = result?.data?.getOpportunityByName?.account || "Nil";
        document.getElementById('primaryContact').innerText = result?.data?.getOpportunityByName?.primaryContact || "Nil";
        document.getElementById('closeDate').innerText = result?.data?.getOpportunityByName?.closeDate || "Nil";
        document.getElementById('estimatedRevenue').innerText = result?.data?.getOpportunityByName?.estimatedRevenue || "Nil";
        document.getElementById('riskLevel').innerText = result?.data?.getOpportunityByName?.riskLevel || "Nil";
        // document.getElementById('dvTable').innerHTML = result?.data?.getContactByName?.opportunities || "Nil";
        generateTable(result?.data?.getOpportunityByName?.contacts, "tbody");
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}