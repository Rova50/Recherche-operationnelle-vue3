export const calculZ = (matrice,matP,value) => {
    if (!Array.isArray(value) || !value.length || !Array.isArray(value[0])) {
        throw new Error("Invalid 2D array");
    }
    let sum = 0;
    for (let index = 0; index < value.length; index++) {
        const element = value[index];
        element.forEach((item) => {
            sum+=parseInt(matrice[index][parseInt(item)]) * parseInt(matP[index][parseInt(item)])
        });
    }
    return sum;
} 