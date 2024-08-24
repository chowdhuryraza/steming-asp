import { useState } from "react";
import api from "../api"
import {useNavigate, Link} from "react-router-dom"
import Swal from 'sweetalert2'
import headerImg from '../assets/images/ProfilePic.png'

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [school, setSchool] = useState("")
  const [grade, setGrade] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const value = event.target.value;
    
    const numberValue = Number(value);
    
    setGrade(numberValue);
  };


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try{
        const res = await api.post("/authenticate/register/", {first_name: firstName, last_name: lastName, grade_level: grade, school, username, email, password})

        Swal.fire({ title: "Registration Successful",
          text: "Please verify your email immediately and login to your account.", 
          icon: "success", 
          toast: true, 
          timer: 5000, 
          position: 'top-right', 
          timerProgressBar: true, 
          showConfirmButton: false, })
        navigate("/login")
    }
    catch (error) {
        console.log(error)

        var errorMessage = "There was an error. Please try again."

        const errorResponse = error.response.data

        const keysArray = Object.keys(errorResponse)

        if(keysArray.length > 0){
          errorMessage = (error.response.data[keysArray[0]])[0].toUpperCase()
        }

        Swal.fire({ title: "Registration Failed", 
            text: errorMessage,
            icon: "error", 
            toast: true, 
            timer: 5000, 
            position: 'top-right', 
            timerProgressBar: true, 
            showConfirmButton: false, })
        e.target.reset()
    }
    finally{
        setLoading(false)
    }

}


  return (
    <section className="bg-[#008000] py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-[#126e12] px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Link
                  to="/"
                  className="mx-auto inline-block max-w-[160px]"
                >
                  <img
                    src={headerImg}
                    alt="STEMing Aspirations Logo"
                    style={{height:60}} 
                  />
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-evenly">
                  <InputBox
                    type="text"
                    value={firstName}
                    name="first_name"
                    change={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                  <InputBox
                    type="text"
                    value={lastName}
                    name="last_name"
                    change={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <InputBox 
                  type="text"
                  value={username}
                  name="username"
                  change={(e) => setUsername(e.target.value)} 
                  placeholder="Username" 
                />
                <InputBox 
                  type="email" 
                  value={email}
                  change={(e) => setEmail(e.target.value)} 
                  name="email" 
                  placeholder="Email" 
                />
                <InputBox
                  type="password"
                  value={password}
                  change={(e) => setPassword(e.target.value)} 
                  name="password"
                  placeholder="Password (Must be a strong password)"
                />
                <InputBox
                  type="text"
                  value={school}
                  name="school"
                  change={(e) => setSchool(e.target.value)} 
                  placeholder="Current School (Optional)"
                />
                <select id="courses" name="courses" className="w-full rounded-md border px-5 py-3 text-base mb-6" onChange={handleChange} required>
                  <option value="" disabled selected>-- Select Your Current Grade --</option>
                  <option value="6">6th Grade</option>
                  <option value="7">7th Grade</option>
                  <option value="8">8th Grade</option>
                  <option value="9">9th Grade</option>
                  <option value="10">10th Grade</option>
                  <option value="11">11th Grade</option>
                  <option value="12">12th Grade</option>
                </select>
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Register"
                    className="w-full cursor-pointer rounded-md border border-yellow bg-yellow px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Already a member?</span>
                <Link
                  to="/login"
                  className="text-[#ffff00] hover:underline ml-1"
                >
                  Login
                </Link>
              </p>

              <div>
                <span className="absolute right-1 top-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.39737"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 1.39737 38.6026)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="1.39737"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 1.39737 1.99122)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="13.6943"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 13.6943 38.6026)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="13.6943"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 13.6943 1.99122)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="25.9911"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 25.9911 38.6026)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="25.9911"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 25.9911 1.99122)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="38.288"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 38.288 38.6026)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="38.288"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 38.288 1.99122)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="1.39737"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 1.39737 26.3057)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="13.6943"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 13.6943 26.3057)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="25.9911"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 25.9911 26.3057)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="38.288"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 38.288 26.3057)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="1.39737"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 1.39737 14.0086)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="13.6943"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 13.6943 14.0086)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="25.9911"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 25.9911 14.0086)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="38.288"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 38.288 14.0086)"
                      fill="#ffff00"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-1 left-1">
                  <svg
                    width="29"
                    height="40"
                    viewBox="0 0 29 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.288"
                      cy="25.9912"
                      r="1.39737"
                      transform="rotate(-90 2.288 25.9912)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="14.5849"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 14.5849 25.9911)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="26.7216"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 26.7216 25.9911)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="2.288"
                      cy="13.6944"
                      r="1.39737"
                      transform="rotate(-90 2.288 13.6944)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="14.5849"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 14.5849 13.6943)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="26.7216"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 26.7216 13.6943)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="2.288"
                      cy="38.0087"
                      r="1.39737"
                      transform="rotate(-90 2.288 38.0087)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="2.288"
                      cy="1.39739"
                      r="1.39737"
                      transform="rotate(-90 2.288 1.39739)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="14.5849"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 14.5849 38.0089)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="26.7216"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 26.7216 38.0089)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="14.5849"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 14.5849 1.39761)"
                      fill="#ffff00"
                    />
                    <circle
                      cx="26.7216"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 26.7216 1.39761)"
                      fill="#ffff00"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>  )
}

export default Register

const InputBox = ({ type, placeholder, name, change }) => {
  if(name != "school"){
    return (
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={change}
          className="w-full rounded-md border px-5 py-3 text-base text-black outline-none focus:border-primary focus-visible:shadow-none border-black"
          required
        />
      </div>
    );
  }
  else{
    return (
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={change}
          className="w-full rounded-md border px-5 py-3 text-base text-black outline-none focus:border-primary focus-visible:shadow-none border-black"
        />
      </div>
    );
  }
};