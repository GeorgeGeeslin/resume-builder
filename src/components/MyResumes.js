import React, {useEffect, useState, useContext} from "react";
import Context from '../context/Context';
import { API } from "aws-amplify";
import { DateTime } from "luxon";
import { FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { onError } from "../libs/errorLib";
import { FlexGroup, SavedResumeCard} from "./ui/elements";
import Nav from './Nav';
import {initialState} from '../store/reducers/resumeReducer';

const MyResumes = () => {

  const context = useContext(Context);
  const {resumeId} = context.resumeContent;
  const {updateUserMeta} = context;

  const [myResumes, setMyResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  async function fetchResumes() {
    try {
      const resumes = await API.get("resume", "/resume");
      console.log(resumes)
      setMyResumes(resumes);
    } catch (err) {
      onError(err)
    }
  };   

  async function handleDelete(thisResumeId, index) {
    try {
      let newResumes = myResumes;
      newResumes.splice(index, 1);  

      await deleteResume(encodeURIComponent(thisResumeId));
      if (resumeId === thisResumeId) {
        await updateUserMeta(initialState);
      }

      setMyResumes([...newResumes]); 
    } catch (err) {
      onError(err);
    }
  }

  function deleteResume(thisResumeId) {
    return API.del("resume", `/resume/${thisResumeId}`);
  }

  const timeStampConverter = (ts) => {
    const dt = DateTime.fromMillis(ts);
    const dateString = dt.toLocaleString(DateTime.DATETIME_MED);
    return dateString;
  };

  const resumeDisplay = myResumes.map((resume, index) => {
    return (

        <SavedResumeCard key={index}>
          <p>Name: {resume.resumeName}</p>
          { resume.created !== resume.modified && <p>{timeStampConverter(resume.modified)}</p> }
          <img style={{width: "192px", height:"230px", border: "1px solid black"}}src={resume.thumbnail} />
          <p>Created:{timeStampConverter(resume.created)}</p>
          <FaFileDownload /> 
          <FaTrashAlt onClick={() => handleDelete(resume.resumeId, index)} style={{cursor: "pointer"}}/>
        </SavedResumeCard>

    )
  });

  return (
    <>
      <Nav />
      <div style={{display:'flex'}}>
      {resumeDisplay}
      </div>
    </>
  )
};

export default MyResumes;