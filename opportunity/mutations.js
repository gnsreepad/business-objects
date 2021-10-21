const createOpportunity = (createOpportunityInput) => {
    const data = JSON.stringify({
        query: `mutation($createOpportunityInput: CreateOpportunity) {
            createOpportunity(createOpportunityInput: $createOpportunityInput){
                id,
                estimatedRevenue,
                closeDate,
                winPercentage
            }
          }`,
          variables: {
            createOpportunityInput
          } 
    });
    return data;
}

const updateOpportunity = (account, updateOpportunityInput) => {
    const data = JSON.stringify({
        query: `mutation($account: String, $updateOpportunityInput: UpdateOpportunity) {
            updateOpportunity(account: $account, updateOpportunityInput: $updateOpportunityInput){
                id,
            }
          }`,
          variables: {
            account,
            updateOpportunityInput
          } 
    });
    return data;
}


const deleteOpportunity = (opportunityAccount) => {
    const data = JSON.stringify({
        query: `mutation($opportunityAccount: String) {
            deleteOpportunity(opportunityAccount: $opportunityAccount)
          }`,
          variables: {
            opportunityAccount
          } 
    });
    return data;
}
