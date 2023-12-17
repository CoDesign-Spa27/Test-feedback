import { useState } from "react";
import { supabase } from "./supabaseClient";
import FetchingCity from "./FetchingCity";

const Form = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPoliceStation, setSelectedPoliceStation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  //Handling Errors
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [nameError, setNameError] = useState("");




  async function submitDescription(e) {
    e.preventDefault();//for 
 
    //validtion to show to the user
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    
    if (!description) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if(!name){
      setNameError(true);
    }
    else {
      setNameError(false);
    }


    if(!mobile){
      setMobileError(true);
    }
    else {
      setMobileError(false);
    }


 
    if(!subject){
      setSubjectError(true);
    }
    else {
      setSubjectError(false);
    }
 
 
   

 
    //handle form submission
    try {
      const { error } = await supabase.from("Feedback-data").insert([
        {
          email: email,
          description:description,
          mobile:mobile,
          name:name,
          subject:subject,
          city: selectedCity,
          police_station:selectedPoliceStation
          
        },
      ]);

      if (error) {
        console.error("Error Submitting FeedBack", error);
      } else {
        console.log("Feedback submitted successfully!");
        setSubmitted(true);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error inserting feedback:", error);
    }
  }

  const handleReset=()=>{
    setEmail('');
    setSelectedCity('');
    setSelectedPoliceStation('');
    setDescription('');
    setMobile('');
    setName('');
    setSubject('');

  }

  return (
    <>
    
        {showForm && (
    <form onSubmit={submitDescription}>
      
              <FetchingCity
      setSelectedCity={setSelectedCity}
      setSelectedPoliceStation={setSelectedPoliceStation}
      
      />
  

        

      <div className="space-y-12 md:ml-5">
        <div className="border-b p-5 text-white pb-12">
         

          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 md:text-xl text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-sm">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) =>{ setEmail(e.target.value)
                    setEmailError(false)
                    }}
                    type="email"
                    name="email"
                    className=" block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                  />
                </div>
                {emailError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Enter Email</p>)}

              </div>
            </div>
            <div >
            <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 md:text-xl text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    id="mobile"
                    value={mobile}
                    onChange={(e) =>{ setMobile(e.target.value)
                      setMobileError(false)
                    }}
                    type="mobile"
                    name="mobile"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Mobile"
                  />
                </div>
                {mobileError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Enter Phone Number</p>)}
                 

              </div>

            </div>
             
             <div>
             <label
                htmlFor="name"
                className="block text-sm md:text-xl font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
             <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    id="name"
                    value={name}
                    onChange={(e) =>{ setName(e.target.value)
                      setNameError(false)
                    }}
                    type="name"
                    name="name"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Your Name"
                  />
                </div>
                {nameError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Enter Your Full Name</p>)}


                </div>
             </div>
             
             <div>
             <label
                htmlFor="subject"
                className="block text-sm md:text-xl font-medium leading-6 text-gray-900"
              >
              Subject
              </label>
             <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    id="subject"
                    value={subject}
                    onChange={(e) =>{ setSubject(e.target.value)
                      setSubject(false)
                    }}
                    type="subject"
                    name="subject"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the Subject"
                  />
                </div>
                {subjectError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Enter Subject</p>)}


                </div>
             </div>
             
            <div className="col-span-full">
              <label
                htmlFor="feedback"
                className="block text-sm md:text-xl font-medium leading-6 text-gray-900"
              >
                FeedBack
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)
                    setDescriptionError(false)}
                  }
                  placeholder="Enter Your Feedback"
                  name="feedback"
                  rows={7}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 md:text-l shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  sm:text-sm sm:leading-6"
                />
              </div>
              {descriptionError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Description Field Should not be Empty</p>)}


            </div>
            <input className="text-white p-3 rounded-lg bg-black" type="submit" value="Submit" />
            <input className="text-black border-solid border-2 border-black hover:text-white hover:bg-gray-700 p-3 rounded-lg bg-white" type="button" onClick={handleReset} value="Reset" />

          </div>
        </div>
      </div>
    </form>
  )}
  {submitted && (<h1 className="text-2xl text-black font-bold">Thank Your For Your Feedback!</h1>)}
  </>
  );
};

export default Form;
