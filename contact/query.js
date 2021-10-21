const getContactByName = (name) => {
  const data = JSON.stringify({
      query: `query($name: String!){
          getContactByName(name:$name){
            contact{
              id,
              name,
              account,
              email,
              address,
              workPhone,
              mobilePhone,
              title
            }
            opportunities {
              name,
              account,
            }
          }
        }`,
        variables: {
          name
        }
    });
    return data;
}

const getContactByEmail = (email) => {
  const data = JSON.stringify({
      query: `query($email: String!){
          getContactByEmail(email:$email){
            contact{
              id,
              name,
              account,
              email,
              address,
              workPhone,
              mobilePhone,
              title
            }
            opportunities {
              name,
              account,
            }
          }
        }`,
        variables: {
          email
        }
    });
    return data;
}