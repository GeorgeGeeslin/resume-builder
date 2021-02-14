import React, {useEffect, useState, useContext} from "react";
import Context from '../context/Context';
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { DateTime } from "luxon";
import { FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { onError } from "../libs/errorLib";
import { FlexGroup, SavedResumeCard} from "./ui/elements";
import Nav from './Nav';
import {initialState} from '../store/reducers/resumeReducer';

const MyResumes = () => {

  const context = useContext(Context);
  const {resumeId} = context.configState;
  const {updateUserMeta, loadAppState} = context;

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

      await deleteResume(thisResumeId);

      if (resumeId === thisResumeId) {
        console.log("delete active resume")
        console.log(initialState)
        await updateUserMeta(null, initialState);
        loadAppState("new", initialState);
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

    const resumeId = resume.resumeId;
    const resumeContent = resume.resumeContent;
    const name = resumeContent.resumeName;
    const created = resume.created;
    const modified = resume.modified;
    const thumbnail = resume.thumbnail;


    return (
      <SavedResumeCard key={index}> 
      <Link to="/"  onClick={() => loadAppState(resumeId, resumeContent)}>
          <p>Name: {name}</p>
          <p>Created: {timeStampConverter(created)}</p>
          { created !== modified && <p>Modified: {timeStampConverter(modified)}</p> }
          <img style={{width: "192px", height:"230px", border: "1px solid black"}}src={thumbnail} />
          <p>Created:{timeStampConverter(resume.created)}</p>
      </Link>
      <FaFileDownload /> 
      <FaTrashAlt onClick={() => handleDelete(resumeId, index)} style={{cursor: "pointer"}}/>
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