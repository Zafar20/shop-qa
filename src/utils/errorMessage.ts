export function errorMessage (error:any) {
    let message = []
    let response = error.response.data
    
    for(let key in response) {
        if(key) {
            message.push(response[key][0])
        }
    }

    let text = message.reduce((acc,item) => acc + ' ' + item, '')
    return text
}