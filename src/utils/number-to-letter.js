export const convert = (n) => {
    var result = '';
    do {
        result = (n % 26 + 10).toString(36) + result;
        n = Math.floor(n / 26) - 1;
    } while (n >= 0)
    return result.toUpperCase();
}