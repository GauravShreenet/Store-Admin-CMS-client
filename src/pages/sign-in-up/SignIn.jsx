import { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap"
import { CustomInput } from "../../component/custom-input/CustomInput";
import { postSignIn } from "../../helper/axiosHelper";
import { toast } from "react-toastify";
import { autoLogin, getUserProfile } from "../profile/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const emailRef = useRef("")
  const passRef = useRef("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { admin } = useSelector((state) => state.adminInfo)

  useEffect(()=>{
    admin?._id && navigate("/dashboard");
    dispatch(autoLogin())
  }, [admin?._id, navigate])


  const handleOnSubmit = async(e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;


    if (email && password) {
      const resPending =  postSignIn({email, password})
      toast.promise(resPending, {
        pending: "Please Wait ...."
      });

      const { status, message, jwts } = await resPending;
      toast[status](message);

      if(jwts?.accessJWT){
        // store the tokens
        sessionStorage.setItem("accessJWT", jwts.accessJWT);
        localStorage.setItem("refreshJWT", jwts.refreshJWT);
        // get user profile data and store in redux
        dispatch(getUserProfile())
        //redirect user to dashboard
      }
    }
  }

  const input = [
    {
        label: 'Email',
        name: 'email',
        required: true,
        placeholder: 'John@email.com',
        forwardRef: emailRef,
    },
    {
        label: 'Password',
        name: 'password',
        required: true,
        type: "password",
        placeholder: 'XXXXXXXXXXX',
        forwardRef: passRef,
    },
]

  return (
    <div>
        <div className="text-center">
            <h1>Fashon</h1>
        </div>
        <hr />
        <Form onSubmit={handleOnSubmit} className="m-auto border rounded shadow-lg p-4 mt-5" style={{width: '600px'}}>
            <h3>Admin Login Only</h3>
            {
                input.map((item, i)=>(<CustomInput key={i} {...item}  />))
            }
            <div className="d-grid">
                <Button type="submit">Login</Button>
            </div>

            <div className="mt-4 text-end">
              Forget Password? <a href="/reset-password">Reset</a> Now.
            </div>
        </Form>
        
    </div>
  )
}

export default SignIn