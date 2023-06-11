class SignupService {

    async signup(post) {

        const res = await fetch(`${process.env.BASE_URL}/signup`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        return res.json()
    }
}

module.exports = new SignupService()