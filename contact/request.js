function generateTable(obj, elementid) {
  var tbody = document.getElementById(elementid);

for (var i = 0; i < obj.length; i++) {
    var tr = "<tr>";

    /* Verification to add the last decimal 0 */
    if (obj[i].name.toString().substring(obj[i].name.toString().indexOf('.'), obj[i].name.toString().length) < 2) 
        obj[i].name += "0";

    /* Must not forget the $ sign */
    tr += "<td>" + (i+1) + "</td>"+ "<td>" + obj[i].account + "</td>" + "<td>" + obj[i].name.toString() + "</td></tr>";

    /* We add the table row to the table body */
    tbody.innerHTML += tr;
}
}





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
        document.getElementById('email').innerText = result?.data?.getContactByName?.contact?.email || "Nil";
        document.getElementById('account').innerText = result?.data?.getContactByName?.contact?.account || "Nil";
        document.getElementById('title').innerText = result?.data?.getContactByName?.contact?.title || "Nil";
        document.getElementById('address').innerText = result?.data?.getContactByName?.contact?.address || "Nil";
        document.getElementById('workPhone').innerText = result?.data?.getContactByName?.contact?.workPhone || "Nil";
        document.getElementById('mobilePhone').innerText = result?.data?.getContactByName?.contact?.mobilePhone || "Nil";
        // document.getElementById('dvTable').innerHTML = result?.data?.getContactByName?.opportunities || "Nil";
        generateTable(result?.data?.getContactByName?.opportunities, "tbody");
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
        document.getElementById('Eemail').innerText = result?.data?.getContactByEmail?.contact?.email || "Nil";
        document.getElementById('Eaccount').innerText = result?.data?.getContactByEmail?.contact?.account || "Nil";
        document.getElementById('Etitle').innerText = result?.data?.getContactByEmail?.contact?.title || "Nil";
        document.getElementById('Eaddress').innerText = result?.data?.getContactByEmail?.contact?.address || "Nil";
        document.getElementById('EworkPhone').innerText = result?.data?.getContactByEmail?.contact?.workPhone || "Nil";
        document.getElementById('EmobilePhone').innerText = result?.data?.getContactByEmail?.contact?.mobilePhone || "Nil";
        generateTable(result?.data?.getContactByEmail?.opportunities, "Etbody");
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}





function deleteContactRequest() { 
	// @ts-ignore
	const email = document.getElementById('emailDelete').value
    console.log(email);
	
	const data = deleteContact(email);
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
        if(result?.data?.deleteContact){
          document.getElementById("isDeleted").innerHTML = "Delete Successful";
        } else {
          document.getElementById("isDeleted").innerHTML = "Delete Failed"
        }
      })
      .catch(function (err) {
        console.log(err);
      });
	
	console.log('Data');
	return false;
}




function updateContactRequest() { 
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
	}
	const email = document.getElementById("updateEmail");

	const data = updateContact(email, createContactInput);
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
        document.getElementById('updatePara').innerHTML = result?.data?.updateContact?.id || 'Unable to Update Contact';
    })
    .catch(function (err) {
        console.log(err);
      });
	return false;
}
