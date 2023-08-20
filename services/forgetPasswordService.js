class forgetPasswordService {

    async forgetPassword(put) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BACKEND}/forget_password`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(put)
        })

        return res.json()
    }
}

module.exports = new forgetPasswordService()