import express from 'express';
import jwt from 'jsonwebtoken';
import bcript from 'bcrypt';

const router = express.Router()


const testMiddleware = (req, res, next) => {
  let { id } = req.params

  if ( id && id === '22') {
    next()
  }else {
    res.sendStatus(500)
  }
}

const authCheckMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) res.status(401).json({ok: false, message: 'Unauthorized'}).send()
    
    if (authorization) {
        let token = authorization.split(' ')[1]

        if (token) {
            jwt.verify(token, 'MY_SECRET_KEY', (err, result) => {
                console.log(err, result)

                if (err) res.status(405).json({ok: false, message: 'error'}).send()
                if (result) next() //res.json(result).send()
            })
        }
    }
}

router.get('/', (req, res) => {
    res.json({ok: true, message: 'is path /'}).send()
})

router.post('/test_params/:id', testMiddleware, (req, res) => {
    res.json({ok: true, message: 'is path /test_post', params: req.params}).send()
})

router.post('/test_query', (req, res) => {
    res.json({ok: true, message: 'is path /test_post', query: req.query}).send()
})

router.post('/test_body', (req, res) => {
    res.json({ok: true, message: 'is path /test_post', body: req.body}).send()
})

router.get('/test_getToken', (req, res) => {
    let user = {
        id: 1,
        login: 'test_login',
        name: 'Author',
    }
    let token = jwt.sign(user, 'MY_SECRET_KEY', { expiresIn: 30} )
    
    res.json({ok: true, token}).send()
})



router.post('/test_hash_pwd', async (req, res) => {
    const { password } = req.body

    
    let hashed_pwd = await bcript.hash(password, 3)
    
    res.json({ok: true, hash: hashed_pwd}).send()
})

router.post('/test_hash_pwd_check', async (req, res) => {
    const { password, hash } = req.body

    
    let compare = await bcript.compare(password, hash)
    
    res.json({ok: true, compare}).send()
})

router.get('/test_verify',authCheckMiddleware, (req, res) => {
    
    res.json({ok: true, message: 'token verified'}).send()

})

//<form>
  //<input name="login" value='123' />
  //<input name="password" value='password' />
//</form>
//test_post?id=22&userId=1

//router.put()

//router.patch()

//router.delete()

export default router