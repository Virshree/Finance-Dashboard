const API_URL="http://localhost:3000/transactions";

export const getTransactions = async()=>{
    const response= await fetch(API_URL);
    return response.json();

}

export const addTransaction=async(transaction)=>{
    const response=await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify(transaction),
    });
    return response.json();
}

export const deleteTransaction=async(id)=>{
    await fetch (`${API_URL}/${id}`,{
        method:"DELETE"
    });

};