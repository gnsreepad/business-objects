const createContact = (createContactInput) => {
    const data = JSON.stringify({
        query: `mutation($createContactInput: CreateContact) {
            createContact(createContactInput: $createContactInput){
              id,
              name,
            }
          }`,
          variables: {
              createContactInput
          } 
    });
    return data;
}


const updateContact = (email, updateContactInput) => {
  const data = JSON.stringify({
      query: `mutation($email: String, $updateContactInput: UpdateContact){
        updateContact(email: $email, updateContactInput: $updateContactInput){
          id
        }
      }`,
        variables: {
          email,
          updateContactInput
        } 
  });
  return data;
}




const deleteContact = (email) => {
  const data = JSON.stringify({
      query: `mutation($email: String) {
        deleteContact(email: $email)
      }`,
        variables: {
          email
        } 
  });
  return data;
}
