const Message = ({err, success}) => {

    return (
        <div style={{marginLeft: '35%', width: '30%'}}>
            {err && <div className="errMsg">{err}</div>}
            {success && <div className="successMsg">{success}</div>}
        </div>
    )
}

module.exports = Message