export const numberRange = (count) => {
    return [...Array(count)].map((element,index)=>index+1)
}