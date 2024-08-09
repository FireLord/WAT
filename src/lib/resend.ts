import { Resend } from 'resend';
const resend_api_key = "re_Frdaa64i_PTG6tXDMwrD2kS2aJeCmrxzs"
declare global {
    var resend: Resend | undefined;
}

export const resend = globalThis.resend || new Resend(resend_api_key);

if (process.env.NODE_ENV !== "production") globalThis.resend = resend;
