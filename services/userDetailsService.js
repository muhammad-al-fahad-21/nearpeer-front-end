class UserDetailsService {

    async getAllUsers(token) {

        const res = await fetch(`${process.env.BASE_URL}/user`, {
            method: "GET",
            next: { revalidate: 60 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async getUserProfile(token) {

        const res = await fetch(`${process.env.BASE_URL}/user/profile`, {
            method: "GET",
            next: { revalidate: 60 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async getUserInformation(token, id) {

        const res = await fetch(`${process.env.BASE_URL}/user/info`, {
            method: "GET",
            next: { revalidate: 60 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'id': id
            }
        })

        return res.json()
    }

    async isAdmin(token, id, put) {

        const res = await fetch(`${process.env.BASE_URL}/user/isAdmin/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(put)
        })

        return res.json()
    }

    async updateUser(token, put) {

        const res = await fetch(`${process.env.BASE_URL}/user/profile`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(put)
        })

        return res.json()
    }

    async deleteUser(token, id) {
        const res = await fetch(`${process.env.BASE_URL}/user`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'id': id
            }
        })

        return res.json()
    }
}

module.exports = new UserDetailsService()