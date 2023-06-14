import courseService from '../services/courseService'
import userDetailsService from '../services/userDetailsService'

const Model = ({Id, name, token, setErr, setSuccess, type}) => {

    const Course = async (token, id) => {
        return await courseService.deleteCourse(token, id)
    }

    const User = async (token, id) => {
        return await userDetailsService.deleteUser(token, id)
    }

    const confirmDelete = async (id, token) => {

        let data;

        switch(type){
            case 'Course':
                data = await Course(token, id)
                setTimeout(() => {
                    window.location.href = '/course/all'
                }, 100)
                break;
            
            case 'User':
                data = await User(token, id)
                setTimeout(() => {
                    window.location.href = '/users'
                }, 100)
                break;

            default:
                setErr('Invalid Operation')
                break;
        }

        if(data && !data.success) return setErr(data.msg)

        setSuccess(data.msg)
    }

  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                You want to delete this {name}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" onClick={() => confirmDelete(Id, token)} data-bs-dismiss="modal">Confirm Delete</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Model