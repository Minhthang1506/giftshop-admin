export const CheckValidateCode = (code) => {
    if (!code) return true;
    return /^[A-Za-z0-9]*$/.test(code);
};
