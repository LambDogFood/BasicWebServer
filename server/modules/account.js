// LordDogFood || 21/03/23

const path = require('path')
const fs = require('fs')
var account_db = path.join(__dirname + '../../../private/accounts.json')

module.exports = {
    // Check if details match database
    Login: function(email, password) {
        fs.readFile(account_db, 'utf8', (err, data) => {
            if (err) throw(err)

            const accounts = JSON.parse(data)
            const account = accounts.find(
                account => (
                    account.email === email &&
                    account.password === password
                )
            )

            if (account) {
                return true, account
            } else {
                return false, "Invalid email or password."
            }
        })
    },

    // Create new details in database
    CreateAccount: function(username, email, password) {
        fs.readFile(account_db, 'utf8', (err, data) => {
            if (err) throw err

            const accounts = JSON.parse(data)

            if (accounts.some(account => (account.email === email))) {
                return false, "This account already exists."
            } else {
                const account = {username, email, password}
                accounts.push(account)

                fs.writeFile(account_db, JSON.stringify(accounts), err => {
                    if (err) throw err

                    return true, account
                })
            }
        })
    }
}
