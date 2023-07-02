import pg from 'pg'
const Pool = pg.Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Predator4@@@localhost:5432/postgres',
    ssl: process.env.DATABASE_URL ? true : false
})

// const pool = new Pool({
//     // user: 'postgres',
//     // password: 'Predator4@@',
//     // host: 'localhost',
//     // port: 5432,
//     // database: 'postgres'
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })

export default pool