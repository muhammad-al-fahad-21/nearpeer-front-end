class UserDetailsService {

    async getAllUsers(token) {

        const res = await fetch(`${process.env.BASE_URL}/api/user`, {
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

        const res = await fetch(`${process.env.BASE_URL}/api/user/profile`, {
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

        const res = await fetch(`${process.env.BASE_URL}/api/user/info`, {
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

        const res = await fetch(`${process.env.BASE_URL}/api/user/isAdmin/${id}`, {
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

        const res = await fetch(`${process.env.BASE_URL}/api/user/profile`, {
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
        const res = await fetch(`${process.env.BASE_URL}/api/user`, {
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