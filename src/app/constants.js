export const ITEMS_PER_PAGE=10
export function discountedPrice(item){
    let discountPercentage=item.discountPercentage
    if(!item.discountPercentage)
        discountPercentage=5
    return Math.round(item.price*(1-discountPercentage/100),2)
}