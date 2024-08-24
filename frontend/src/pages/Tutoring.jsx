import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import api from "../api";



const courseOptions = [
  { value: "ACT", label: "ACT" },
  { value: "SAT", label: "SAT" },
  { value: "NYC SHSAT", label: "NYC SHSAT" },
  { value: "Grade/Regents Level Sciences", label: "Grade/Regents Level Sciences" },
  { value: "Grade/Regents Level Math", label: "Grade/Regents Level Math" },
  { value: "Advanced Placement Biology", label: "Advanced Placement Biology" },
  { value: "Advanced Placement Chemistry", label: "Advanced Placement Chemistry" },
  { value: "Advanced Placement Physics 1", label: "Advanced Placement Physics 1" },
  { value: "Advanced Placement Statistics", label: "Advanced Placement Statistics" },
  { value: "Advanced Placement Calculus AB", label: "Advanced Placement Calculus AB" },
  { value: "Advanced Placement Calculus BC", label: "Advanced Placement Calculus BC" },
  { value: "Advanced Placement Computer Science A", label: "Advanced Placement Computer Science A" },
];

const Tutoring = () => {
  const [courses, setCourses] = useState([])
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (selectedCourse) => {
    setCourses(selectedCourse)
  }


  const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault()

      try{
          const res = await api.get("/api/tutoring/request/")

          if(res.status === 200){
            try{
              await api.post("/api/tutoring/request/", {selected_courses: courses.map(dict => dict.value), 
                                                                    additional_information: additionalInfo})
              
              Swal.fire({ title: "Successfully Submitted Request",
                text: "Be on the lookout for an email with further instructions.", 
                icon: "success",})
              navigate("/")
            }
            catch (error) {
              Swal.fire({ title: "Failed To Submit Request",
                text: error.response.data.selected_courses, 
                icon: "error",})
            }
          }
      }
      catch (error) {
          Swal.fire({ title: "Failed To Submit Request",
            text: error.response.data.detail, 
            icon: "error",})
      }
      finally{
          setLoading(false)
      }

  }

  return (
    <section className="bg-[#008000] py-[120px] pt-[150px] min-h-screen">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] rounded-lg bg-[#126e12] px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <h1 className="mx-auto inline-block max-w-[160px] text-[#ffff00] font-bold text-lg">
                  Submit A Tutoring Request
                </h1>
                
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-10">
                  <Select
                    isMulti
                    name="courses" 
                    className="basic-multi-select mb-3"
                    placeholder="Select Subject(s)..."
                    options={courseOptions}
                    value={courses}
                    onChange={handleChange}
                  />
                  <InputBox 
                    type="text" 
                    value={additionalInfo}
                    change={(e) => setAdditionalInfo(e.target.value)} 
                    name="additionalInfo" 
                    placeholder="Additional Information We Should Know (Optional)" 
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="w-full cursor-pointer rounded-md border border-yellow bg-yellow px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>

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
    </section>
  )
}

export default Tutoring
const InputBox = ({ type, placeholder, name, change }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={change}
        className="w-full rounded-md border px-6 py-5 text-base text-black outline-none focus:border-primary focus-visible:shadow-none border-black"
      />
    </div>
  );
};