
class LoginService {

    async login(post) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/login`, {
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