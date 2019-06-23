# Using JSON Web Tokens

### Step 1: Install jsonwebtoken

    npm i jsonwebtoken

### Step 2: Write your login in auth-router.js:

    const jwt = require('jsonwebtoken');
    const secrets = require('../database/secrets.js');

    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            let token = null;

            const user = await userDB.login(username);

            user && bcrypt.compareSync(password, user.password)
            ? (token = generateToken(user),
            res.status(200).json({ message: `Welcome ${user.username}!`, token }))
            : res.status(401).json({ message: 'Invalid credentials.' });
        } catch(err) {
            res.status(500).json({ success: false, err })
        }
    });

    function generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username
        };

        const options = {
            expiresIn: '1d',
        };

        return jwt.sign(payload, secrets.jwtSecret, options);
    }

### Step 3: Have a separate file for your secret:

    module.exports = {
        jwtSecret: process.env.JWT_SECRET || 'who is victoria and what is her secret',
    };

### Step 4: Create restriction middleware to check the token:

    const jwt = require('jsonwebtoken');
    const secrets = require('../database/secrets.js');

    module.exports = (req, res, next) => {

        const token = req.headers.authorization;

        token
        ? jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            err
            ? res.status(401).json({ message: 'Invalid credentials.' })
            : next()
        })
        : res.status(400).json({ message: 'No token provided.' });
    }


