import { Client } from 'pg';

export async function getClient() {
    const client = new Client({
        host: 'localhost',       
        port: 5434,             
        user: 'nitishrai',   
        password: '123', 
        database: 'postgres',      
    });
    await client.connect();
    return client;
}