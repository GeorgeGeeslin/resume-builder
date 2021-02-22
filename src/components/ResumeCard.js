import React, {useContext} from "react";
import Context from '../context/Context';
import { Link } from "react-router-dom";
import { FaFileDownload, FaTrashAlt } from "react-icons/fa";
import { SavedResumeCard} from "./ui/elements";

const ResumeCard = ({resume, index}) => {

  const context = useContext(Context);
  const {updateUserMeta, loadAppState, downloadResume} = context;

  const resumeId = resume.resumeId;
  const resumeContent = resume.resumeContent;
  const name = resumeContent.resumeName;
  // const created = resume.created;
  // const modified = resume.modified;
  const thumbnail = resume.thumbnail;

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
};

export default ResumeCard;