import axios from "axios";

export async function sendStkPush(request, response) {
    try {
        const token = request.token; // Retrieve token from middleware
        if (!token) {
            return response.status(500).json({success:false, error: "Token not available" });
        }

        const { phoneNumber, amount } = request.body; 
        console.log(request.body);
        
        if (!phoneNumber || !amount) {
            return response.status(400).json({ success:false, error: "Phone number and amount are required" });
        }

        const date = new Date();
        const timestamp =
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2);

        const stk_password = Buffer.from(
            process.env.SHORTCODE + process.env.PASSKEY + timestamp
        ).toString("base64");

        const requestBody = {
            BusinessShortCode: process.env.SHORTCODE,
            Password: stk_password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: process.env.SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: "https://c31e-197-248-42-199.ngrok-free.app/api/callback",  
            // server url plus path to callback route handling callback 
            AccountReference: "account",
            TransactionDesc: "test payment",
        };

        const stkResponse = await axios.post(
            "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        response.status(200).json({success:true, data:stkResponse.data})
        
        
    } catch (error) {
        console.log(error);
        
        console.error("STK Push Error:", error.response?.data || error.message);
        response.status(500).json({ sucess:false, message: "Failed to process STK Push request" });
    }
}
