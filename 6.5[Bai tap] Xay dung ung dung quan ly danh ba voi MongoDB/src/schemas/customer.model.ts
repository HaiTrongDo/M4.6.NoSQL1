import {Schema, model} from "mongoose";


interface IBook {
    customerName: string;
    phone: number;
    address: string;
}

const customerSchema = new Schema<IBook>({
    customerName: String,
    phone: Number,
    address: String,
})



const Customer = model<IBook>('Contact', customerSchema);
export { Customer };