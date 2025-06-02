export async function callback(request,response){
    const callbackData = request.body;

    // Check the result code
    const result_code = callbackData.Body.stkCallback.ResultCode;
    if (result_code !== 0) {
      // If the result code is not 0, there was an error
      const error_message = callbackData.Body.stkCallback.ResultDesc;
      const response_data = { ResultCode: result_code, ResultDesc: error_message };
      return response.json(response_data);
    }
  
    // If the result code is 0, the transaction was completed
    const body = request.body.Body.stkCallback.CallbackMetadata;
  
    // Get amount
    const amountObj = body.Item.find(obj => obj.Name === 'Amount');
    const amount = amountObj.Value
    console.log(amount,'amount');
    
  
    // Get Mpesa code
    const codeObj = body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');
    const mpesaCode = codeObj.Value 
    console.log(mpesaCode,'mpesa code');
    
  
    // Get phone number
    const phoneNumberObj = body.Item.find(obj => obj.Name === 'PhoneNumber');
    const phone = phoneNumberObj.Value
    console.log(phone,'user phone');
    
  
    // Save the variables to a file or database, etc.
    // ...
  
    // Return a success response to mpesa
    return response.json("success"); 
} 