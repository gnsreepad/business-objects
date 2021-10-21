const getOpportunityByName = (name) => {
    const data = JSON.stringify({
        query: `query($name: String!){
            getOpportunityByName(name: $name){
              id, 
              name,
              winPercentage,
              account,
              primaryContact,
              closeDate,
              estimatedRevenue,
              riskLevel,
              contacts{
                name,
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
        query: `query($account: String!){
            getOpportunityByAccount(account: $account){
              id, 
              name,
              winPercentage,
              account,
              primaryContact,
              closeDate,
              estimatedRevenue,
              riskLevel,
              contacts{
                name,
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