const getOpportunityByName = (name) => {
    const data = JSON.stringify({
        query: `query($name: String){
            getOpportunityByName(name: $name){
              id, 
              name,
              contacts{
                id,
                email
              }
            }
          }`,
          variables: {
            name
          }
      });
      return data;
  }
  

const getOpportunityByAccount = (account) => {
    const data = JSON.stringify({
        query: `query($account: String){
            getOpportunityByName(account: $account){
              id, 
              name,
              contacts{
                id,
                email
              }
            }
          }`,
          variables: {
            account
          }
      });
      return data;
  }