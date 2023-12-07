import React, { useState } from "react";
import { supabase } from "./components/supabaseClient";

const Form = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);

  async function submitFeedback(e) {
    e.preventDefault();//for 
 
    //validtion to show to the user
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    
    if (!feedback) {
      setFeedbackError(true);
    } else {
      setFeedbackError(false);
    }



    //for validation
    if(!email && !feedback){
      console.log("Please enter");
      return;
    }
    else if(!email){
      console.log("Please enter email");
      return;
    }
    else if(!feedback){
      console.log("Please enter feedback");
      return;
    }
    //handle form submission
    try {
      const { error } = await supabase.from("Feedback-Table").insert([
        {
          email: email,
          feedback: feedback,
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

  return (
    <>
        {showForm && (
    <form onSubmit={submitFeedback}>
      <div className="space-y-12">
        <div className="border-b p-5 text-white pb-12">
          <p className="mt-1 text-sm leading-6 md:text-xl text-gray-600">
            Share Your Feedback Freely.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 md:text-xl text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) =>{ setEmail(e.target.value)
                    setEmailError(false)
                    }}
                    type="email"
                    name="email"
                    className="block flex-1 outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                  />
                </div>
                {emailError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Enter Email</p>)}

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
                  id="feedback"
                  value={feedback}
                  onChange={(e) => {setFeedback(e.target.value)
                    setFeedbackError(false)}
                  }
                  placeholder="Enter Your Feedback"
                  name="feedback"
                  rows={7}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 md:text-l shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  sm:text-sm sm:leading-6"
                />
              </div>
              {feedbackError && (<p className="animate-bounce h-2 duration-300 text-red-700 text-l">Feedback Field Should not be Empty</p>)}


            </div>
            <input className="text-white p-3 rounded-lg bg-black" type="submit" value="Submit" />
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
