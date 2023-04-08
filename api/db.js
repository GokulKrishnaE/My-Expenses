import pg from 'pg'
const Pool = pg.Pool

const pool = new Pool({
    user: 'postgres',
    password: 'Predator4@@',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

export default pool