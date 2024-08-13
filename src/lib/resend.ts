import { Resend } from 'resend';
const resend_api_key = "re_Frdaa64i_PTG6tXDMwrD2kS2aJeCmrxzs"
// const resend_api_key = "re_ET2Wq4r9_FJYVbzymKYggVXxYWNtEjBeF"

declare global {
    var resend: Resend | undefined;
}

export const resend = globalThis.resend || new Resend(resend_api_key);

if (process.env.NODE_ENV !== "production") globalThis.resend = resend;

