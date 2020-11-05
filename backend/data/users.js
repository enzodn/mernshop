import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'User User',
        email: 'user@example.com',
        password: bcrypt.hashSync('user', 10),
    },
    {
        name: 'Daniel Smith',
        email: 'daniel@example.com',
        password: bcrypt.hashSync('daniel', 10),
    },
    {
        name: 'Anthony Johnson',
        email: 'anthony@example.com',
        password: bcrypt.hashSync('anthony', 10),
    },
    {
        name: 'Jacob Williams',
        email: 'jacob@example.com',
        password: bcrypt.hashSync('jacob', 10),
    },
    {
        name: 'David Brown',
        email: 'david@example.com',
        password: bcrypt.hashSync('david', 10),
    },
    {
        name: 'Alexander Garcia',
        email: 'alexander@example.com',
        password: bcrypt.hashSync('alexander', 10),
    },
]

export default users