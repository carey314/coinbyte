import http from '../utils/http';

//Get a list of withdrawal templates
function getWithDrawalTemplates () {
    return http.get("/v2/my/withdrawals/patterns");
}

//Get withdrawal template details
function getWithDrawalTemplateDetails (patternId : string) {
    return http.get("/v2/my/withdrawals/patterns/" + patternId);
}

//Get a list of withdrawal methods
function getWithDrawalMethods () {
    return http.get("/v2/my/withdrawals/methods");
}

//Get withdrawal method details
function getWithDrawalMethodDetails (methodId : string) {
    return http.get(`/v2/my/withdrawals/methods/${methodId}`);
}

//Get a list of withdrawal groups
function getWithDrawalGroups () {
    return http.get("/v2/my/withdrawals/groups");
}

//Get a list of currencies added to withdrawal methods
function getWithDrawalCurrenciesAdd () {
    return http.get("/v2/my/withdrawals/currencies");
}
//Initialize a wizard for withdrawing funds
function getInitWizardWithdrawingFunds () {
    return http.get("/v2/my/withdrawals/wizard");
}
//Make a withdrawal
function makeWithdrawal (data : any) {
    return http.post("/v2/my/withdrawals",data);
}
//Confirm a withdrawal
function confirmAWithdrawal (data : any) {
    return http.post("/v2/my/withdrawals/wizard",data);
}

function getWhiteListAddress(params: any){
    return http.get("/v2/my/withdrawals/policies", params)
}

function getWhiteListAddressUUID(){
    return http.get("/v2/my/withdrawals/policies/wizard")
}

function addWithdrawalAddress(params: any){
    return http.post("/v2/my/withdrawals/policies", params)
}

export {
    getWithDrawalTemplates,
    getWithDrawalTemplateDetails,
    getWithDrawalMethods,
    getWithDrawalMethodDetails,
    getWithDrawalGroups,
    getWithDrawalCurrenciesAdd,
    getInitWizardWithdrawingFunds,
    makeWithdrawal,
    confirmAWithdrawal,
    getWhiteListAddress,
    getWhiteListAddressUUID,
    addWithdrawalAddress
}