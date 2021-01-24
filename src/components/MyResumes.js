import React, {useEffect, useState} from "react";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FlexGroup } from "./ui/elements";

const MyResumes = () => {

  const [myResumes, setMyResumes] = useState([]);
  // const [deletedResumes, setDeletedResumes] = useState([]);

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

  // async function deleteResume(resumeId, index) {
  //   try {
  //     console.log(resumeId)

  //     const result = await API.del("resume", `/resume/${resumeId}`);
  //     console.log(result);

  //     console.log(index)
  //     console.log(myResumes)

  //     let newResumes = myResumes;
  //     newResumes.splice(index, 1);
  //     // simply passing newResmues was not triggering re-render.
  //     setMyResumes([...newResumes]);      

  //   } catch (err) {
  //     onError(err)
  //   }
  // }

  // console.log(resumeId);
  // let newResumes = myResumes;
  // newResumes.splice(index, 1);    

  async function handleDelete(resumeId, index) {
    try {
      console.log(resumeId);
      let newResumes = myResumes;
      newResumes.splice(index, 1);  

      const result = await deleteResume(encodeURIComponent(resumeId));
      console.log(result)
      setMyResumes([...newResumes]); 
    } catch (err) {
      onError(err);
    }
  }

  function deleteResume(resumeId) {
    return API.del("resume", `/resume/${resumeId}`);
  }

  const resumeDisplay = myResumes.map((resume, index) => {
    return (
      <FlexGroup key={index}>
        <div>
          <p>{resume.name}</p>
          <p>{resume.resumeId}</p>
          <p>{resume.created}</p>
          <h1 onClick={() => handleDelete(resume.resumeId, index)} style={{cursor: "pointer"}}>X</h1>
        </div>
      </FlexGroup>
    )
  });

  return (
    <div>
      {resumeDisplay}
    </div>
  )
};

export default MyResumes;