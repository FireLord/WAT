import { authenticate } from "../middleware/authenticate-jwt";
import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const revenueCatHook = async (req: Request, res: Response) => {
    try {
    console.log(req.body.event, "...\n\n");
    const {event_timestamp, product_id, period_type, purchased_at, expiration_at, environment, presented_offering_id, transaction_id, original_transaction_id, country_code, app_user_id, original_app_user_id, is_trial_conversion, currency, price, price_in_purchased_currency, type, store, takehome_percentage, tax_percentage, commission_percentage, renewal_number, offer_code} =req.body.event
    let user_id;
    const user = await prisma.user.findUnique({
        where: {
            email: app_user_id
        }
    })
    user_id = user?.id
    if(!user){
           const rc_user = await prisma.revenueCatId.findUnique({
               where:{
                   rc_id:app_user_id
               }
           })
           user_id = rc_user.user_id
    }

     await prisma.transaction.create({
        data:{
            user_id,
            event_timestamp,
            product_id,
            period_type,
            purchased_at,
            expiration_at,
            environment,
            presented_offering_id,
            transaction_id,
            original_transaction_id,
            country_code,
            app_user_id,
            original_app_user_id,
            is_trial_conversion,
            currency,
            price,
            price_in_purchased_currency,
            type,
            store,
            takehome_percentage,
    }})    

    await prisma.user.update({
        where:{
            id:user_id
        },
        data:{
            subscription_expiry: new Date(expiration_at)
        }
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"An error occurred during revenuecat transaction"});
    }
}
// const event =[event_timestamp, product_id, period_type, purchased_at, expiration_at, environment, presented_offering_id, transaction_id, original_transaction_id, country_code, app_user_id, original_app_user_id, is_trial_conversion, currency, price, price_in_purchased_currency, type, store, takehome_percentage, tax_percentage, commission_percentage, renewal_number, offer_code]

export const setRevenueCatId = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization'];
        const authObj=await authenticate(authHeader)
        const id:string = authObj.id
        if(!id){
        return res.status(401).json({ message: authObj.message });
        }
        console.log("v2: newTemplate->",new Date());

        const { revenueCatId }:{revenueCatId:string} = req.body;
        await prisma.revenueCatId.upsert({
            where:{
                id:authObj.id
            },
            create:{
                user_id:id,
                rc_id:revenueCatId
            },
            update:{
                rc_id:revenueCatId
            }
        })

        return res.json({message:"app_user_id from rc is mapped to user_id"});


    } catch (error) {
        console.log(error);
    }
}



// this array will have every thing from below body.events
// const body= {
//        event: {
//          event_timestamp_ms: 1725277851141,
//          product_id: 'whatstrek.subscription.v1:whatstrek-subscription-v1-base',
//          period_type: 'NORMAL',
//          purchased_at_ms: 1725277798094,
//          expiration_at_ms: 1725278098094,
//          environment: 'SANDBOX',
//          entitlement_id: null,
//          entitlement_ids: [ 'whatstrek.subscription.v1' ],
//          presented_offering_id: 'default',  
//          transaction_id: 'GPA.3371-3179-1145-02753..0',
//          original_transaction_id: 'GPA.3371-3179-1145-02753',
//          is_family_share: false,
//          country_code: 'IN',
//          app_user_id: '$RCAnonymousID:9599ac72fbe3439db8276d4912ca0a81',
//          aliases: [ '$RCAnonymousID:9599ac72fbe3439db8276d4912ca0a81' ],
//          original_app_user_id: '$RCAnonymousID:9599ac72fbe3439db8276d4912ca0a81',
//          currency: 'INR',
//          is_trial_conversion: false,
//          price: 5.962,
//          price_in_purchased_currency: 500,
//          subscriber_attributes: {},
//          store: 'PLAY_STORE',
//          takehome_percentage: 0.85,
//          offer_code: null,
//          tax_percentage: 0.1525,
//          commission_percentage: 0.1271,
//          renewal_number: 2,
//          type: 'RENEWAL',
//          id: '8A9319FB-D308-4D89-8E0D-354A712A4CBC',
//          app_id: 'app719c6ec13d'
//        },}
