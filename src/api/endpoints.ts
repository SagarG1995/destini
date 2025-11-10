


export const endpoints = {
    login: "auth/login",
    verifyregisterotp: "auth/verify-otp",
    register: "auth/register",
    sendfogotpasswordotp: "auth/forgot-password",
    verifyforgotpasswordotp: "auth/verify-reset-otp",
    changepassword: "auth/reset-password",
    completeprofile: "auth/edit",
    googlelogin: "auth/google-login",

    getme: "auth/me",
    updateme: "auth/edit",


    professions: 'professions/grouped',

    homeapi: 'plans/nearby?',

    getplacesuggestion: 'location/autocomplete',
    createplan: 'plans',
    updateplan: "plans/",
    deleteplan: "plans/",
    myplans: 'plans/mine',
    acceptdeclinerequest: "plans/request/",
    requestplan: "plans/request/",
    activities: "plans/activity/mine",

    getchats: "chat/user-groups",

}