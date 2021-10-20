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

const getContactByName = (name) => {
    const data = JSON.stringify({
        query: `query($name: String!){
            getContactByName(name:$name){
              contact{
                id,
                name,
                account
              }
              opportunities {
                id,
                name,
              }
            }
          }`,
          variables: {
            name
          }
      });
      return data;
}
