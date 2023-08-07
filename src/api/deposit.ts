import http from '../utils/http';

//Get a list of deposit methods
function getDepositMethods() {
    return http.get("/v2/my/deposits/methods");
}
//
function getDepositGroups() {
    return http.get("/v2/my/deposits/groups");
}

function getDepositTransactions(
    limit: number = 10,
    offset: number = 0,
    sort_order: string | null,
    sort_by: string | null,
    type: string | null,
    status: string | null,
    accountId: string | null
) {
    const param = { limit, offset, sort_by, sort_order, type, status, accountId }
    return http.get("/v2/my/transactions", param);
};

function makeDeposit(
    accountId:number, 
    methodId:number, 
    currencyCode:number, 
    amount:number|null, 
    isPretend = false,
    appInstanceId:string|null,
    data:any|null
){
    const param = {accountId,methodId,currencyCode,amount,isPretend,appInstanceId,data}
    return http.post("/v2/my/deposits/sync", param)
}


export {
    getDepositMethods,
    getDepositGroups,
    getDepositTransactions,
    makeDeposit
}