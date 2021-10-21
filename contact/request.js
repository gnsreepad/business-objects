function createContactRequest() { 
	// @ts-ignore
	const formData = Array.from(document.querySelectorAll('#CreateContact input')).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
    console.log(formData);
	const createContactInput = {
		// @ts-ignore
		name: formData.name,
		// @ts-ignore
		account: formData.account,
    	// @ts-ignore
    	address: formData.address,
    	// @ts-ignore
    	title: formData.title,
    	// @ts-ignore
    	workPhone: formData.workPhone.toString(),
    	// @ts-ignore
    	mobilePhone: formData.mobilePhone.toString(),
    	// @ts-ignore
    	email: formData.email
	}
	
	const data = createContact(createContactInput);
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
        // console.log(result);
        document.getElementById('tablename').innerText = result?.data?.createContact?.id || 'Unable to Add Contact';
    })
    .catch(function (err) {
        console.log(err);
      });
	return false;
}


function contactByName() { 
	// @ts-ignore
	const name = document.getElementById('name').value
    console.log(name);
	
	const data = getContactByName(name);
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
        console.log(result.data.getContactByName.contact.name);
        document.getElementById('tablename').innerText = result?.data?.getContactByName?.contact?.name || "No contact of this name";
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}