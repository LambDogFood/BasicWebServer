const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

// 
app.set(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')

//
app.use(session({
    secret: 'thisisaverygoodcookiekeywhichneedstobeuniquelmao',
    resave: false,
    saveUninitialized: true
}))

// 
app.use(bodyParser.urlencoded({extended: true}));

// 
app.get('/', (res, req) => {
    if (res.session && res.session.username) {
        req.redirect('dashboard')
    } else {
        req.redirect('login')
    }
})

app.get('/login', (res, req) => {
    if (res.session && res.session.username) {
        req.redirect('dashboard')
    } else {
        req.render('login')
    }
})

app.get('/signup', (res, req) => {
    if (res.session && res.session.username) {
        req.redirect('dashboard')
    } else {
        req.render('login')
    }
})

// Login/Signup submissions
app.post('/login', (req, res) =>{
    const {email, password} = req.body

    
    fs.readFile(path.join(__dirname + '/private/accounts.json'), 'utf8', (err, data) => {
        if (err) 
            throw err

        const accounts = JSON.parse(data);

        const account = accounts.find(account => account.email === email && account.password === password);

        if (account) {
            req.session.username = account.username
            res.redirect('dashboard')
        } else {
            res.send('Invalid email or password')
        }
    })
})

app.post('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.clearCookie('connect.sid');
      return res.redirect('login');
    });
  });

app.post('/signup', (req, res) => {
    const {username, email, password} = req.body

    fs.readFile(path.join(__dirname + '/private/accounts.json'), 'utf8', (err, data) => {
        if (err)
            throw err

        const accounts = JSON.parse(data);

        if (accounts.some(account => account.email === email)) {
            res.send("Already registered")
        } else {
            const newAccount = {username, email, password}
            accounts.push(newAccount)

            fs.writeFile(path.join(__dirname + '/private/accounts.json'), JSON.stringify(accounts), err => {
                if (err)
                    throw(err)

                req.session.username = username
                res.redirect('dashboard')
            })
        }
    })
})

app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.render('dashboard')
    } else {
        res.redirect('login')
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})