const axios = require('axios');
require('dotenv').config();

const { FLUTTERWAVE_BASE_URL, FLUTTERWAVE_SK_TEST } = process.env;


const flutterwaveApi = axios.create({
    baseURL: FLUTTERWAVE_BASE_URL,
    headers: {
        'Authorization': `Bearer ${FLUTTERWAVE_SK_TEST}`,
        'Content-Type': 'application/json'
    },
    timeout: 5000, // Set a timeout of 5 seconds
})

const initializePayment = async(paymentData)=>{
    try{
        const response = await flutterwaveApi.post(
            '/payments',
             paymentData
        );

        if(response.data.status !== 'success'){
            throw new Error(`Payment initialization failed: ${response.data.message}`);
        }

    }catch(error){
        console.error("Error initializing payment:", error.response.data || error.message);
        throw new Error("Failed to initialize payment");
    }
}

module.exports = initializePayment;