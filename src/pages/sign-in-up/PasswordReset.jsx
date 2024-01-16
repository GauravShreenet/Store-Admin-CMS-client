import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap"
import { CustomInput } from "../../component/custom-input/CustomInput";
import { requestOTP, resetPassword } from "../../helper/axiosHelper";
import {toast} from 'react-toastify';

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
}

const PasswordReset = () => {

  const emailRef = useRef("")

  const [showOtop, setShowOTP] = useState(true)
  const [respo, setRespo] = useState({})

  const [form, setForm] = useState(initialState)


  const handleOnOtpRequest = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value
    if(!email){
      return toast.error("Email is required")
    }

    const pending = requestOTP(email)
    toast.promise(pending, {
      pending: "Please wait..."
    })

    const resp = await pending;
    setRespo(resp);

    setForm({ email })

    resp.status === "success" && setShowOTP(false);


  }

  const handleOnChnage = (e) => {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value
    })

    //do the password validation
  }

  const handleOnPasswordChange = async(e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form
    console.log(form.email)
    if (!form.email || form.password !== confirmPassword) {
      return toast.error("Password doesnt match or email not provided")
    }
    //call api and send data
    const pending = resetPassword(rest)

    toast.promise(pending, {
      pending: "please wait..."
    })

    const resp = await pending
    setRespo(resp)

  }

  const inputsOTP = [
    {
      label: 'Email',
      name: 'email',
      required: true,
      placeholder: 'John@email.com',
      forwardRef: emailRef,
    },
  ]
  const inputsResetPassword = [
    {
      label: 'OTP',
      name: 'otp',
      required: true,
      placeholder: '12312343',

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
      placeholder: 'XXXXXXXXXXX',

    },
  ]

  return (
    <div>
      <div className="text-center">
        <h1>Fashon</h1>
      </div>
      <hr />

{
  respo.message && <Alert variant={respo.status === 'success' ? 'success' : 'danger'}>
    {respo.message}
  </Alert>
}

      {
        showOtop ? (<Form 
        onSubmit={handleOnOtpRequest} 
        className="m-auto border rounded shadow-lg p-4 mt-5" style={{ width: '600px' }}>
          <h3>Request OTP to Reset Password</h3>
          {
            inputsOTP.map((item, i) => (<CustomInput key={i} {...item} />))
          }
          <div className="d-grid">
            <Button type="submit">Request OTP</Button>
          </div>

          <div className="mt-4 text-end">
            Ready to Login? <a href="/">Login</a> Now.
          </div>
        </Form>) : (
          <Form 
          onSubmit={handleOnPasswordChange} 
          className="m-auto border rounded shadow-lg p-4 mt-5" style={{ width: '600px' }}>
            <h3>Update your password</h3>
            {
              inputsResetPassword.map((item, i) => (<CustomInput key={i} {...item} onChange={handleOnChnage}/>))
            }
            <div className="d-grid">
              <Button type="submit">Update password</Button>
            </div>

            <div className="mt-4 text-end">
              Ready to Login? <a href="/">Login</a> Now.
            </div>
          </Form>
        )
      }

    </div>
  )
}

export default PasswordReset