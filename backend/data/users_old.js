import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'User1 User',
        email: 'user1@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'User2 User',
        email: 'user2@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users