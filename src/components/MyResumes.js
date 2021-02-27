import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Spinner, SavedResumesWrapper } from "./ui/elements";
import Nav from './Nav';
import ResumeCard from './ResumeCard';

const MyResumes = () => {

  const [myResumes, setMyResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  async function fetchResumes() {
    try {
      const resumes = await API.get("resume", "/resume");
      console.log(resumes)
      setMyResumes(resumes);
      setIsLoading(false);
    } catch (err) {
      onError(err)
    }
  };   

  const removeResume = (index) => {
    let newResumes = myResumes
    newResumes.splice(index, 1);

    setMyResumes([...newResumes]);
  } 

  const resumeDisplay = myResumes.map((resume, index) => {
    return (
      <ResumeCard key={index} resume={resume} index={index} removeResume={removeResume}/>
    )
  });

  const options = {
    saveBool: false,
    themeBool: false,
    downloadBool: false,
    newResumeBool: true,
    myResumesBool: false
  };

  return (
    <>
      <Nav {...options}/>
        <SavedResumesWrapper>
          {isLoading && <Spinner/>}
          {!isLoading && resumeDisplay}         
        </SavedResumesWrapper>
    </>
  )
};

export default MyResumes;