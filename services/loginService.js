
class LoginService {

    async login(post) {
        
        const res = await fetch(`${process.env.BASE_URL}/api/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        return res.json()
    }
}

module.exports = new LoginService()