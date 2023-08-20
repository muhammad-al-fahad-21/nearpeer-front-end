class CoursesService {

    async getUserCourse(token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course/user`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async createUserCourses(token, id, post) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'user_id': id
            },
            body: JSON.stringify(post)
        })

        return res.json()
    }

    async getAllCourses(token) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }

    async deleteCourse(token, id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'id': id
            }
        })

        return res.json()
    }

    async updateCourse(token, id, user_id, put) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'user_id': user_id
            },
            body: JSON.stringify(put)
        })

        return res.json()
    }

    async getCourse(token, id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/course/${id}`, {
            method: "GET",
            next: { revalidate: 10 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })

        return res.json()
    }
}

module.exports = new CoursesService()