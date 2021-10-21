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
        console.log(result?.data?.getContactByName?.contact?.name);
        document.getElementById('tablename').innerText = result?.data?.getContactByName?.contact?.name || "No contact of this name";
        document.getElementById('email').innerText = result?.data?.getContactByName?.contact?.email || "No contact of this name";
        document.getElementById('account').innerText = result?.data?.getContactByName?.contact?.account || "No contact of this name";
        document.getElementById('title').innerText = result?.data?.getContactByName?.contact?.title || "No contact of this name";
        document.getElementById('address').innerText = result?.data?.getContactByName?.contact?.address || "No contact of this name";
        document.getElementById('workPhone').innerText = result?.data?.getContactByName?.contact?.workPhone || "No contact of this name";
        document.getElementById('mobilePhone').innerText = result?.data?.getContactByName?.contact?.mobilePhone || "No contact of this name";
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}


function contactByEmail() { 
	// @ts-ignore
	const email = document.getElementById('findemail').value
    console.log(email);
	
	const data = getContactByEmail(email);
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
        console.log(result?.data?.getContactByEmail?.contact?.name);
        document.getElementById('Etablename').innerText = result?.data?.getContactByEmail?.contact?.name || "No contact of this email";
        document.getElementById('Eemail').innerText = result?.data?.getContactByEmail?.contact?.email || "No contact of this email";
        document.getElementById('Eaccount').innerText = result?.data?.getContactByEmail?.contact?.account || "No contact of this email";
        document.getElementById('Etitle').innerText = result?.data?.getContactByEmail?.contact?.title || "No contact of this email";
        document.getElementById('Eaddress').innerText = result?.data?.getContactByEmail?.contact?.address || "No contact of this email";
        document.getElementById('EworkPhone').innerText = result?.data?.getContactByEmail?.contact?.workPhone || "No contact of this email";
        document.getElementById('EmobilePhone').innerText = result?.data?.getContactByEmail?.contact?.mobilePhone || "No contact of this email";
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}