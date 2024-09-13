const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('User', 'users');
    await cleanDB('Product', 'products');
    await cleanDB('Category', 'categories');

    const categories = await Category.insertMany([
        { name: 'Organs' },
        { name: 'Exotic Animals' },
        { name: 'Clearance' }
    ]);

    console.log('categories seeded');

    const products = await Product.insertMany([
        {
            name: 'Heart',
            description: 'A human heart, freshly harvested.',
            image: 'heart.jpg',
            category: categories[0]._id,
            price: 170000.00,
            quantity: 1
        },
        {
            name: 'Lungs',
            description: 'A pair of human lungs, freshly harvested.',
            image: 'lungs.jpg',
            category: categories[0]._id,
            price: 200000.00,
            quantity: 1
        },
        {
            name: 'Liver',
            description: 'A human liver, freshly harvested.',
            image: 'liver.jpg',
            category: categories[0]._id,
            price: 180000.00,
            quantity: 1
        },
        {
            name: 'Kidney',
            description: 'A human kidney, freshly harvested.',
            image: 'kidney.jpg',
            category: categories[0]._id,
            price: 150000.00,
            quantity: 3
        },
        {
            name: 'Spleen',
            description: 'A human spleen, freshly harvested.',
            image: 'spleen.jpg',
            category: categories[0]._id,
            price: 160000.00,
            quantity: 1
        },
        {
            name: 'Bengal Tiger',
            description: 'A beautiful tiger, caught on the coast of India.',
            image: 'tiger.jpg',
            category: categories[1]._id,
            price: 20000.00,
            quantity: 1
        },
        {
            name: 'Snow Leopard',
            description: 'A rare snow leopard, from the mountains of Nepal.',
            image: 'leopard.jpg',
            category: categories[1]._id,
            price: 30000.00,
            quantity: 1
        },
        {
            name: 'Snowy Owl',
            description: 'A majestic snowy owl, from the frozen Arctic. His name George.',
            image: 'owl.jpg',
            category: categories[1]._id,
            price: 5000.00,
            quantity: 1
        },
        {
            name: 'Pangolin',
            description: 'An adorable pangolin, from the jungles of Africa.',
            image: 'pangolin.jpg',
            category: categories[1]._id,
            price: 10000.00,
            quantity: 1
        },
        {
            name: 'Sea Turtle',
            description: 'Beautiful sea turtles, straight from the beaches of Hawaii. Ethically harvested.',
            image: 'turtle.jpg',
            category: categories[1]._id,
            price: 7000.00,
            quantity: 15
        },
        {
            name: 'Chimpanzee',
            description: 'A playful chimpanzee, from the forests of the Congo.',
            image: 'chimpanzee.jpg',
            category: categories[1]._id,
            price: 8000.00,
            quantity: 1
        },
        {
            name: 'Human Brain',
            description: 'Not so freshly harvested, but still in good condition.',
            image: 'Brain.jpg',
            category: categories[2]._id,
            price: 500,
            quantity: 1
        },
        {
            name: 'Human Hand',
            description: 'A human hand, severed from the body.',
            image: 'hand.jpg',
            category: categories[2]._id,
            price: 200,
            quantity: 1
        },
        {
            name: 'Human Foot',
            description: 'A human foot, severed from the body.',
            image: 'foot.jpg',
            category: categories[2]._id,
            price: 150,
            quantity: 1
        },
        {
            name: 'Human Eye',
            description: 'A human eye, freshly harvested.',
            image: 'eye.jpg',
            category: categories[2]._id,
            price: 100,
            quantity: 1
        },
        {
            name: 'Human Ear',
            description: 'A human ear, freshly harvested.',
            image: 'ear.jpg',
            category: categories[2]._id,
            price: 50,
            quantity: 6
        },
    ]);

    console.log('products seeded');

    await User.create({
        firstName: 'Nick',
        lastName: 'Nastyn',
        email: 'koliandrik@gmail.com',
        password: 'Pelmeni1',
        orders: [
            {
                products: [products[0]._id, products[1]._id, products[2]._id]
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});
