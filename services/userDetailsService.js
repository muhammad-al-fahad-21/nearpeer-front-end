class UserDetailsService {

    async getAllUsers(token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async getUserProfile(token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user/profile`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async getUserInformation(token, id) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user/info`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'id': id
            }
        })

        return res.json()
    }

    async isAdmin(token, id, put) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user/isAdmin/${id}`, {
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

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user/profile`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/user`, {
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