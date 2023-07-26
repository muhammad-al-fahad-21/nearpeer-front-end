import { createSlice } from "@reduxjs/toolkit"
import { onError } from "./model"
import { getUserCourse, getAllCourses, getCourse } from "../services/courseService"

const course = createSlice({
    name: "course",
    initialState: {
        user: [],
        courses: [],
        course: []
    },
    reducers: {
        userCourse: (course, action) => {
            course.user = action.payload.userCourse
        },

        allCourses: (course, action) => {
            course.courses = action.payload.courses
        },

        getCourseId: (course, action) => {
            course.course = action.payload.course
        }
    }
})

export const User = (token) => async (dispatch) => {
    try {
        const user = await getUserCourse(token)
        if(!user.success) return dispatch(onError({ error: user.msg }));
        dispatch(userCourse({ userCourse: user.userCourse }));
    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
}

export const Courses = (token) => async (dispatch) => {
    try {
        const courses = await getAllCourses(token)
        if(!courses.success) return dispatch(onError({ error: courses.msg }));
        dispatch(allCourses({ courses: courses.courses }));
    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
}

export const Course = (token, id) => async (dispatch) => {
    try {
        const course = await getCourse(token, id)
        if(!course.success) return dispatch(onError({ error: course.msg }));
        dispatch(getCourseId({ course: course.course }));
    } catch (error) {
        dispatch(onError({ error: error.message }));
    }
}

export const { userCourse, allCourses, getCourseId } = course.actions;
export default course.reducer;