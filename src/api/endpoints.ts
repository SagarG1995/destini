


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
    plans: 'plans/',
    myplans: 'plans/mine',
    acceptdeclinerequest: "plans/request/",
    requestplan: "plans/request/",
    activities: "plans/activity/mine",
    exitplan: "plans/request/",

    getchats: "chat/user-groups",

}