import React, {useEffect, useState, useContext} from "react";
import Context from '../context/Context';
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
// import { DateTime } from "luxon";
import { FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { onError } from "../libs/errorLib";
import { SavedResumeCard, Spinner, SavedResumesWrapper} from "./ui/elements";
import Nav from './Nav';
import {initialState} from '../store/reducers/resumeReducer';

const MyResumes = () => {

  const context = useContext(Context);
  const {resumeId} = context.configState;
  const {updateUserMeta, loadAppState} = context;

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

  async function handleDelete(thisResumeId, name, index) {
    try {
      const conf = window.confirm(`Delete resume: ${name}?`);

      if (conf) {
        let newResumes = myResumes;
        newResumes.splice(index, 1);  
  
        await deleteResume(thisResumeId);
  
        if (resumeId === thisResumeId) {
          console.log("delete active resume")
          console.log(initialState)
          await updateUserMeta(null, initialState);
          loadAppState("new", initialState);
        }
  
        setMyResumes([...newResumes]); 
      }
    } catch (err) {
      onError(err);
    }
  };

  function deleteResume(thisResumeId) {
    return API.del("resume", `/resume/${thisResumeId}`);
  };

  // const timeStampConverter = (ts) => {
  //   const dt = DateTime.fromMillis(ts);
  //   const dateString = dt.toLocaleString(DateTime.DATETIME_MED);
  //   return dateString;
  // };

  const resumeDisplay = myResumes.map((resume, index) => {

    const resumeId = resume.resumeId;
    const resumeContent = resume.resumeContent;
    const name = resumeContent.resumeName;
    // const created = resume.created;
    // const modified = resume.modified;
    const thumbnail = resume.thumbnail;


    return (
      <SavedResumeCard key={index}> 
      <Link to="/"  onClick={() => loadAppState(resumeId, resumeContent)}>
          <img style={{width: "192px", height:"230px"}}src={`data:image/png;base64,${thumbnail}`} />
      </Link>
      <div className="nameplate">
        <div className="nameplate-name">
          {name}
        </div>
        <div className="nameplate-options">
            <div className="nameplate-button">
              Download <FaFileDownload/> 
            </div>
            <div className="nameplate-button" onClick={() => handleDelete(resumeId, name, index)}>
              Delete <FaTrashAlt/>
            </div>
          </div>
      </div>
      </SavedResumeCard>
    )
  });

  return (
    <>
      <Nav />
        <SavedResumesWrapper>
          {isLoading && <Spinner/>}
          {!isLoading && resumeDisplay}         
        </SavedResumesWrapper>
    </>
  )
};

export default MyResumes;