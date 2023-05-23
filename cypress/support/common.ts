import { CustomerFeddback } from "./model/customer-feedback.model";

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


export function generateString(length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// export function setCustomerComment(comment: string): void {
//     customerFeddback.comment = comment;
// }

// export function setCustomerRating(rating: number): void {
//     customerFeddback.rating = rating;
// }