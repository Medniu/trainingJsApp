async function serverRequest(url, subRequest, method, body){
    const result = await fetch(url+subRequest,
    {
        method: method,
        body: body
    });   
    return result
} 

export { serverRequest }