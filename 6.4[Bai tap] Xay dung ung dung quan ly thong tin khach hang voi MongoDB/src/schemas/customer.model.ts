import {Schema, model} from "mongoose";


interface IBook {
    customerName: string;
    age: string;
    address: string;
}

const customerSchema = new Schema<IBook>({
    customerName: String,
    age: String,
    address: String,
})



const Customer = model<IBook>('customer', customerSchema);
export { Customer };