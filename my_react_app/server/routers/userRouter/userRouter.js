import express from 'express';
import jwt from 'jsonwebtoken';
import bcript from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient()


router.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    if (email && name && password) {
        let candidate = await prisma.user.findUnique(({
            where: {
                email: email
            }
        }))
        console.log("🚀 ~ router.post ~ candidate:", candidate)
    }
})

router.post('login', (req, res) => {
    
})
export default router