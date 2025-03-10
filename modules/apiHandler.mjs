HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
}

const isPROD = false;
//Kan bruke fra HTTP_CODES fra tidligere

const BASE_API_TEST_1 = "Test1/"
const BASE_API_TEST_2 = "Test2/"
const BASE_API_PROD = ""

const BASE_API = (isPROD) ? BASE_API_PROD : BASE_API_TEST_1;


const API_ENDPOINTS = {
    GetTree: `${BASE_API}/tree`,
    DeleteNode: (id) => `${BASE_API}/node/${id}`,
}

async function retriveUserTecTree(userID){
    const tree = await handleRequest(API_ENDPOINTS.GetTree)

}

async function deleteTecTree(nodeID){
    const tree = await handleRequest(API_ENDPOINTS.DeleteNode(nodeID))
}

async function handleRequest(path, method = HTTP_METHODS.GET, body = null) {

    const request = {
        method,
        headers: {
            'Content-Type': 'application/json',
            
    }};

    //Kan skrives sånn:
    /* if([HTTP_METHODS.POST, HTTP_METHODS.PATCH, HTTP_METHODS.PUT]){ 
        request.body = JSON.stringify(data)
    } */

    //Eller sånn:
    if(method === HTTP_METHODS.POST){ //Husk PUT og PATCH
        request.body = JSON.stringify(data)
    }
    
    const response = await fetch(path, request);

    return await response.json();

}