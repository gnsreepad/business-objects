const createContact = () => {
    const data = JSON.stringify({
        query: `mutation {
            createContact(createContactInput: {
              email: "ganesh@gmail.com",
              name: "ganesh",
              account: "bla",
              address: "bla",
            }){
              id
            }
          }` 
    });
    return data;
}
const getContact = () => {
    const data = JSON.stringify({
        query: `{
            getContactByName(name:"myname"){
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
      });
}
