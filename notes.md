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


### Step 5: Implement checkRole middleware:

First, add roles into payload of token:

    function generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username,
            roles: ['student']
        };

        const options = {
            expiresIn: '1d',
        };

        return jwt.sign(payload, secrets.jwtSecret, options);
    }

Second, add parameters to get request to return user as req.user:

    router.get('/', restricted, async (req, res) => {
        try {
            const users = await usersDB.find();

            res.status(200).json({ users, user: req.user })
        } catch(err) {
            res.status(500).json({ success: false, err });
        }
    })

State req.user through restriction middleware and add multiple object properties:

    const jwt = require('jsonwebtoken');
    const secrets = require('../database/secrets.js');

    module.exports = (req, res, next) => {

        const token = req.headers.authorization;

        token
        ? jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            err
            ? res.status(401).json({ message: 'Invalid credentials.' })
            : (req.user = { roles: decodeToken.roles, username: decodeToken.username }, 
              next()
            }))
        : res.status(400).json({ message: 'No token provided.' });
    }

There is a collection of roles, which is in an array, therefore array methods are available to peruse, like 'includes'.
Therefore, when you check for the user roles, the statement goes like this:

Is there a req.user?
Yes? Does it have roles && is roles an array && does roles include the passed in role (i.e. student)? 
Then, next, else, forbidden. If there isn't any user, unauthorized.

    module.exports = (role) => {
        return function(req, res, next) {
            req.user
            ? (req.user.roles 
               && Array.isArray(req.users.roles) 
               && req.user.roles.includes(role)
               ? next()
               : res.status(403).json({ message: 'You ain't authoriiiiiized sooooooonnnn!' }))
            : res.status(401).json({ message: 'Ya'll need to login first, yunno?' });
        }
    }

Note that this is a separate middleware file called checkRoles-mw.js, and you import it as:

    checkRole = require('../middleware/checkRoles-mw.js');

Although you can easily just group them in an auth middleware with your restriction one.