import {convert} from '@/utils/number-to-letter'

export const convertRange = (count) => {
    return [...Array(count)].map((element,index)=>convert(index))
}