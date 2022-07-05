import {Router} from 'express';
const customerRoutes = Router();
import {Customer} from "../schemas/customer.model";
import multer from 'multer'

const upload = multer();
customerRoutes.get('/create', (req, res) => {
    res.render("createCustomer");
});

customerRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const customer = await newCustomer.save();
        if (customer) {
            res.render("success");
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

customerRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.body.id});
        customer.customerName = req.body.title;
        customer.phone = req.body.description;
        customer.address = req.body.author;
        await customer.save();
        if (customer) {
            res.render("success");
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

customerRoutes.get('/list', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render("listCustomer", {customers: customers});
    } catch {
        res.render("error");
    }
});

customerRoutes.get('/update/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id});
        console.log(customer, 'customer')
        if (customer) {
            res.render("updateCustomer", {customer: customer})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

customerRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id});
        if (customer) {
            await customer.remove();
            res.status(200).json({message: "success"});
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});
export default customerRoutes;