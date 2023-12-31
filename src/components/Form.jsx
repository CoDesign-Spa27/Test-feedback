import { useEffect, useState } from "react";
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
  const [showHistory, setShowHistory] = useState(false);
  const [loading,setLoading]= useState(false);
  //Handling Errors
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [submissionHistory,setSubmissionHistory]=useState([]);


//save submission to local storage
const saveSubmmisionToLocalStorage =(submission)=>{

const {email, description, mobile, name, subject,city,police_station}=submission;

if(email && description && mobile && name && subject && city && police_station){
  const storedData = localStorage.getItem('feedback');
const previousSubmission = storedData ? JSON.parse(storedData) : [];
  const updatedSubmission = [...previousSubmission,submission];
  localStorage.setItem('feedback', JSON.stringify(updatedSubmission)); 
}
else{
  console.log("Some input fields are missing");
}
}



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
  
    
    saveSubmmisionToLocalStorage({
      email,
      description,
      mobile,
      name,
      subject,
      city:selectedCity,
      police_station:selectedPoliceStation

  });
  setLoading(true);
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

      setTimeout(() => {
        setSubmitted(false);
        setShowForm(true);
      },3000 );
         
      }
    } catch (error) {
      console.error("Error inserting feedback:", error);
    }
    finally{
      setLoading(false);
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


  
  //for retrieving data from local storage
  const loadDataFromLocalStorage =()=>{
    
    const storedData = JSON.parse(localStorage.getItem('feedback'))||[];
    setSubmissionHistory(storedData);
 
   }

   useEffect(()=>{
    loadDataFromLocalStorage();
   },[])
    
   //display history information
  const handleHistory=()=>{
    loadDataFromLocalStorage();
    handlShowHistory();
    // localStorage.clear();
    console.table(submissionHistory);
   }
  //handle the history toggle
  const handlShowHistory=()=>{
setShowHistory(!showHistory);
  }

  return (
    <>
    
    
        {showForm && (
    <form onSubmit={submitDescription}>
      
              <FetchingCity
      setSelectedCity={setSelectedCity}
      setSelectedPoliceStation={setSelectedPoliceStation}
      
      />
  

        

      <div className="space-y-12 md:ml-20 md:mr-20">
        <div className="border-b p-5  pb-12">
         

          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 md:text-xl text-[#1E1C67]"
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
                    className=" block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                  />
                </div>
                {emailError && (<p className="  mt-2 text-sm text-red-700 sm:max-w-sm text-center  bg-red-200">! Enter Email</p>)}

              </div>
            </div>
            <div >
            <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 md:text-xl text-[#1E1C67]"
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
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="Enter Mobile"
                  />
                </div>
                {mobileError && (<p className="  mt-2 text-sm text-red-700 sm:max-w-sm text-center  bg-red-200">Enter Phone Number</p>)}
                 

              </div>

            </div>
             
             <div>
             <label
                htmlFor="name"
                className="block text-sm md:text-xl font-medium leading-6 text-[#1E1C67]"
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
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  focus:ring-1 focus:ring-blue-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="Enter Your Name"
                  />
                </div>
                {nameError && (<p className="  mt-2 text-sm text-red-700 sm:max-w-sm text-center  bg-red-200">Enter Your Full Name</p>)}


                </div>
             </div>
             
             <div>
             <label
                htmlFor="subject"
                className="block text-sm md:text-xl font-medium leading-6 text-[#1E1C67]"
              >
              Subject
              </label>
             <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    id="subject"
                    value={subject}
                    onChange={(e) =>{ setSubject(e.target.value)
                      setSubjectError(false)
                    }}
                    type="subject"
                    name="subject"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="Enter the Subject"
                  />
                </div>
                {subjectError && (<p className="   mt-2 text-sm text-red-700 sm:max-w-sm text-center  bg-red-200">Enter Subject</p>)}


                </div>
             </div>
             
            <div className="col-span-full">
              <label
                htmlFor="feedback"
                className="block text-sm md:text-xl font-medium leading-6 text-[#1E1C67]"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 md:text-l shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-blue-600   sm:text-sm sm:leading-6"
                />
              </div>
              {descriptionError && (<p className="   mt-2 text-sm text-red-700 sm:max-w-sm text-center  bg-red-200">Description Field Should not be Empty</p>)}


            </div>
            <input className="text-white p-3 rounded-lg bg-black" type="submit" value="Submit" />
            <input className="text-black border-solid border-2 border-black hover:text-white hover:bg-gray-700 p-3 rounded-lg bg-white" type="button" onClick={handleReset} value="Reset" />
            <input className="text-white p-3 rounded-lg bg-black" type="button" 
            value={showHistory ? "Hide History" :"Show History"} 
             onClick={handleHistory}/>

          </div>
        </div>
      </div>
   {showHistory && (
      
    <div>
<h2 className="text-xl sm:text-2xl text-center my-5 md:mx-40 font-medium bg-slate-200 py-5">FeedBack History</h2>
<div className="overflow-y-auto md:mx-40">
  <table className="w-full whitespace-nowrap divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
      
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {submissionHistory.map((feedback, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
          <td className="px-6 py-4">{feedback.email}</td>
          <td className="px-6 py-4">{feedback.description}</td>
          <td className="px-6 py-4">{feedback.subject}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
      )     
} 
    </form>
  )}
  {loading && (
<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
role="status">
<span
  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
>Loading...</span>
</div>
    )}

{ submitted && (
  <div className="w-full h-screen flex justify-center items-center "> 
    <div className="max-w-sm bg-white border flex flex-col items-center justify-center h-[400px] w-[400px] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl text-center font-bold p-10">Your feedback is valuable for us!</h1>
      <p className=" bg-green-100 rounded-xl border text-xl p-5 border-green-600">Submitted</p>
    </div>
    </div>
  )}
  </>
  );
};

export default Form;
