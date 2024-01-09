import { Button, Form } from "react-bootstrap"
import { CustomInput } from "../../component/custom-input/CustomInput"
import { useState } from "react"
import { toast } from "react-toastify";
import { postNewAdmin } from "../../helper/axiosHelper";

const SignUp = () => {

    const [form, setForm] = useState({}); //initial state to be done
    const [passwordValidationError, setpasswordValidationErrorForm] = useState(""); //initial state to be done

    const handleOnChange = (e) => {

        const {name, value} = e.target;
        setpasswordValidationErrorForm("")
        if( name === "password"){
            value.length < 6 && setpasswordValidationErrorForm("Must be longer than 6 characters");

            !/[A-Z]/.test(value) && setpasswordValidationErrorForm("Must include uppcase")
            !/[a-z]/.test(value) && setpasswordValidationErrorForm("Must include lowercase")
            !/[0-9]/.test(value) && setpasswordValidationErrorForm("Must include number")
        }

        if( name === "confirmPassword"){
            form.password !== value && setpasswordValidationErrorForm("Password doesn't match")
        }
        
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const {confirmPassword, ...rest} = form
        if(confirmPassword !== rest.password) {
            toast.error("Password do not match");
            return;
        }
        const userPending = postNewAdmin(rest);

        toast.promise(userPending, {
            pending: "Please wait...",
            // success: "We have sent you an email with instruction to verifu your email. Please check your inbox/spam and follow the instruciton.",
            // error: "Error! Unable to process your request please contact admin",
        })

        const {status, message} = await userPending;
        toast[status](message);
    }

    const input = [
        {
            label: 'First Name',
            name: 'fName',
            required: true,
            placeholder: 'John',
        },
        {
            label: 'Last Name',
            name: 'lName',
            required: true,
            placeholder: 'Wick',
        },
        {
            label: 'Email',
            name: 'email',
            required: true,
            placeholder: 'John@email.com',
        },
        {
            label: 'Phone',
            name: 'phone',
            placeholder: '040989087',
        },
        {
            label: 'Address',
            name: 'address',
            placeholder: '1 george st, Sydney',
        },
        {
            label: 'Password',
            name: 'password',
            required: true,
            type: "password",
            placeholder: 'XXXXXXXXXXX',
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            required: true,
            type: "password",
            placeholder: 'XXXXXXXXXXXXX',
        },
    ]

  return (
    <div>
        <div className="text-center">
            Fashon
        </div>
        <hr />
        <Form onSubmit={handleOnSubmit} className="m-auto border rounded shadow-lg p-4 mt-5" style={{width: '600px'}}>
            <h3>Admin SignUp</h3>
            {
                input.map((item, i)=>(<CustomInput key={i} {...item} onChange={handleOnChange}/>))
            }
            <div className="">
                {passwordValidationError && <div className="text-danger fw-bold p-2">{passwordValidationError}</div>}
            </div>

            <div className="d-grid">
                <Button type="submit" disabled={passwordValidationError}>Register</Button>
            </div>
        </Form>
        
    </div>
  )
}

export default SignUp