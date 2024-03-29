const Course = ({course, handleSubmit, handleChangeInput, id}) => {

    const {user_id, title, description, rating, last_update, upload_date} = course

  return (
    <div>
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user_id">User Id</label>
                    <input type="number" placeholder="Enter user id" id="user_id"
                    value={user_id} name="user_id" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter title" id="title"
                    value={title} name="title" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea placeholder="Enter description" id="description"
                    value={description} name="description" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" placeholder="0" id="rating"
                    value={rating} name="rating" onChange={handleChangeInput} />
                </div>

                {
                    id && 
                    <div>
                        <label htmlFor="last_update">Lastest Update</label>
                        <input type="date" id="last_update" value={last_update} name="last_update" onChange={handleChangeInput} />
                    </div>
                }

                <div>
                    <label htmlFor="upload_date">Upload Date</label>
                    <input type="date" id="upload_date"
                    value={upload_date} name="upload_date" onChange={handleChangeInput} />
                </div>

                <div className="row" style={{marginTop: '10px'}}>
                    <button type="submit">{id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Course