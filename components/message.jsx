const Message = ({err, success}) => {

    return (
        <div style={{marginLeft: '30%', marginTop: '2%', marginBottom: '-50px', width: '1000px'}}>
            {err && <div className="errMsg">{err}</div>}
            {success && <div className="successMsg">{success}</div>}
        </div>
    )
}

module.exports = Message