import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import { postVerifyEmail } from "../../helper/axiosHelper";

//show spinner
//grab query strings from url
// call server with e and c
// remove spinner and show message from server

const VerifyEmail = () => {

    const [searchParams] = useSearchParams();
    const [showSpinner, setShowSpinner] = useState(true)
    const [resp, setResp] = useState({})
    const associate = searchParams.get('email')
    const token = searchParams.get('c')

    useEffect(() => {
        //call axios helper to call api
        userEmailVerificaiton();
    }, [])

    const userEmailVerificaiton = async() => {
        const response = await postVerifyEmail({associate, token})
        setShowSpinner(false)
        setResp(response)
    }


    return (
        <div>
            <div className="text-center">
                Fashon
            </div>
            <hr />
            <div className="text-center mt-5">
                {
                    showSpinner && <Spinner variant="dark" animation="border" />
                }
            </div>
            {
                resp.message && <Alert className="w-50 m-auto" variant={resp.status === 'success' ? "success" : "danger"} >
                    {resp.message}
                </Alert>
            }



        </div>
    )
}

export default VerifyEmail