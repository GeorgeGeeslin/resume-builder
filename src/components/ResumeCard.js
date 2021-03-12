import React, {useState, useContext} from "react";
import Context from '../context/Context';
import { Link } from "react-router-dom";
import {  FaTrashAlt } from "react-icons/fa";
import { SavedResumeCard, Spinner } from "./ui/elements";
import { onError } from "../libs/errorLib";
// import { DateTime } from "luxon";
import { API } from "aws-amplify";
import {initialState} from '../store/reducers/resumeReducer';


const ResumeCard = ({resume, index, removeResume}) => {

  const context = useContext(Context);
  const {loadAppState, updateUserMeta} = context;
  const {resumeId} = context.configState;

  const [isLoading, setIsLoading] = useState(false);

  // const timeStampConverter = (ts) => {
  //   const dt = DateTime.fromMillis(ts);
  //   const dateString = dt.toLocaleString(DateTime.DATETIME_MED);
  //   return dateString;
  // };

  const thisResumeId = resume.resumeId;
  const resumeContent = resume.resumeContent;
  const name = resumeContent.resumeName;
  // const created = resume.created;
  // const modified = resume.modified;
  const thumbnail = resume.thumbnail;

  async function handleDelete(thisResumeId, name, index) {
    const conf = window.confirm(`Delete resume: ${name}?`);

    if (conf) {

      try {
        setIsLoading(true);  
        await deleteResume(thisResumeId);
        removeResume(index);

        if (thisResumeId === resumeId) {
          await updateUserMeta(null, initialState);
          loadAppState("new", initialState)
        }

      } catch (err) {
        onError(err);
      } finally {
        setIsLoading(false);
      }

    }
  };

  function deleteResume(thisResumeId) {
    return API.del("resume", `/resume/${thisResumeId}`);
  };

  return (
    <SavedResumeCard> 
      <Link to="/" onClick={() => loadAppState(thisResumeId, resumeContent)}>
        { isLoading && <div style={{width: "192px", height: "230px", display: "flex", justifyContent: "center", alignItems: "center"}}><Spinner/></div>}
        { !isLoading && <img style={{width: "192px", height:"230px"}}src={`data:image/png;base64,${thumbnail}`} /> }
      </Link>
      <div className="nameplate">
      <div className="nameplate-name">
        {name}
      </div>
      <div className="nameplate-options">
        { !isLoading &&
          <div className="nameplate-button" onClick={() => handleDelete(thisResumeId, name, index)}>
            Delete <FaTrashAlt/>
          </div>
        }
        { isLoading &&
          name
        }  
        </div>
      </div>
    </SavedResumeCard>
  )
};

export default ResumeCard;