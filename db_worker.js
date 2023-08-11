const pg=require("pg");
const { Pool } = pg;

require("dotenv").config();

const db_user = process.env.DB_USER;
const db_pswd = process.env.DB_PSWD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

const pool=new Pool({
    user: db_user,
    password: db_pswd,
    host: db_host,
    port: db_port,
    database: db_name
});



async function select_products() {
    return (await pool.query("SELECT * FROM products")).rows
}


async function select_product(product_id) {
    return (await pool.query("SELECT * FROM product WHERE product_id = $1", [product_id.toString()])).rows
}


async function select_attributes(product_id) {
    return (await pool.query("SELECT * FROM attributes WHERE product_id = $1",[product_id.toString()])).rows

}


async function select_images(product_id) {
    return (await pool.query("SELECT * FROM images WHERE product_id = $1",[product_id.toString()])).rows
}


async function select_relation_products(product_id) {
    return (await pool.query("SELECT * FROM relations WHERE product_id = $1",[product_id.toString()])).rows
}


async function select_reviews_brief(product_id) {
    return (await pool.query("SELECT * FROM reviews WHERE product_id = $1",[product_id.toString()])).rows
}


async function select_reviews(product_id) {
    return (await pool.query("SELECT * FROM reviews WHERE product_id = $1",[product_id.toString()])).rows
}


async function select_tags() {
    return (await pool.query("SELECT * FROM tags")).rows
}

async function select_saleproducts(product_id) {
    return (await pool.query("SELECT * FROM saleproducts WHERE product_id = $1",[product_id.toString()])).rows
}

async function get_cart(cart_id) {
    return (await pool.query("SELECT * FROM carts WHERE cart_id = $1", [cart_id.toString()])).rows
}


async function insert_cart(cart) {
    // return (await pool.query("INSERT INTO carts VALUES ($1, $2)",)).rows
}


async function update_cart(cart) {

}


async function delete_cart(cart) {

}


async function get_customer(customer_id) {
    return (await pool.query("SELECT * FROM customers WHERE customer_id = $1",[customer_id.toString()])).rows[0]
}




module.exports={
    select_products, select_product, select_attributes,
    select_images, select_relation_products, select_reviews,
    select_reviews_brief, select_tags, select_saleproducts,
    get_cart, get_customer, insert_cart,
    update_cart, delete_cart,
}
