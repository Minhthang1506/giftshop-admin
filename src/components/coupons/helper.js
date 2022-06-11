
export const GenerateCode = (prefix, amount) => {
    var codes = []
    for(var i = 0; i < amount; i++) {
        var code = `${prefix}#${makeString(10)}`
        codes.push({id: i, code, isUsed: false});
    }
    return codes
}

export const makeString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}