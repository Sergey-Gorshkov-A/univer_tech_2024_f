import express from 'express'
import jwt from 'jsonwebtoken';
import bcript, { hash } from 'bcrypt';
import { PrismaClient }  from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
    const { email, name, number } = req.body

    try {
        prisma.$connect()
        let candidate = await prisma.user.update(({
            where: {
                email: email
            },
            data: {
                name: name,
                number: number,
            },
        }))

        if (!candidate) return res.status(200).json({ok: false, message: "Данные введены неверно"})

        let _user = candidate
        delete _user.password

        //let token = jwt.sign(_user, 'MY_SECRET_KEY', { expiresIn: '1d'} )
        prisma.$disconnect()
        
        return res.json({ok: true, user: _user})

    } catch (error) {
        res.status(500).json({ok: false, result: undefined, errMsg: error})
    }
})

export default router;