//regular expression
const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export function isDataComplete(data: any) : boolean{
    console.log(data);
    for (var key in data){
        if (data[key] === "" || data[key] === null) return false
    }
    return true
}

export function testEmailRegExp(email: string) : boolean{
    return emailRegExp.test(email);
}
export function testPasswordRegExp(password: string) : boolean{
    return passwordRegExp.test(password)
}
export function arePasswordsSame(password: string, repeatedPassword: string) : boolean{
    return true ? password === repeatedPassword : false;
}