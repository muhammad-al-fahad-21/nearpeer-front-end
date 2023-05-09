
class CoursesService {

    async getUserCourse(token) {

        const res = await fetch(`${process.env.BASE_URL}/api/course`, {
            method: "GET",
            next: { revalidate: 60 },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
        })

        return res.json()
    }

    async createUserCourses(token, id, post) {
        const res = await fetch(`${process.env.BASE_URL}/api/course`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
              'user_id': id
            },
            body: JSON.stringify(post)
        })

        return res.json()
    }
}

module.exports = new CoursesService()