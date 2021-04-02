import React, {useEffect, useContext, useState} from 'react';
import Context from '../context/Context';
import { onError } from "../libs/errorLib";
import Nav from '../components/Nav';
import ResumeEditor from './ResumeEditor';
import ReactTooltip from "react-tooltip";
import {Spinner} from '../components/ui/elements';
import { Auth } from "aws-amplify";

export default function Home() {

  const context = useContext(Context);
  const {resumeId, userHasAuthenticated} = context.configState;
  const resumeContent = context.resumeContent;
  const {getLastState, updateUserMeta, configInfoChange} = context;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resumeId) onfirstLoad();
    if (resumeId) updateUserMeta(resumeId, resumeContent);
  // eslint-disable-next-line  
  }, [resumeId, userHasAuthenticated]);

  async function onfirstLoad() {
    setIsLoading(true)
    try {
      await checkAuth();
      if (userHasAuthenticated) await getLastState();
    } catch (err) {
      onError(err);
    } finally{
      setIsLoading(false);
    }
  };

  async function checkAuth() {
    try {
      const session = await Auth.currentSession();
      if (session) {
        configInfoChange({payload: true, name: 'userHasAuthenticated'});
      } else {
        configInfoChange({payload: false, name: 'userHasAuthenticated'});;
      }
    } catch(err) {
      if (err !== 'No current user') onError(err);
    }
  };

  const options = {
    saveBool: true,
    themeBool: true,
    downloadBool: true,
    newResumeBool: true,
    myResumesBool: true,
    resumeNameBool: true
  };

  return (
    <>
      <Nav {...options}/>
      { isLoading && 
        <div style={{backgroundColor: '#DFE1E6', width: '100vw', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
          <Spinner/>
        </div>   
      }
      { !isLoading && <ResumeEditor /> }
      <ReactTooltip /> 
    </>
  )
};