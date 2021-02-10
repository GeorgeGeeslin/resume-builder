import React, {useEffect, useContext} from 'react';
import Context from '../context/Context';
import { onError } from "../libs/errorLib";
import Nav from '../components/Nav';
import ResumeEditor from './ResumeEditor';
import ReactTooltip from "react-tooltip";

export default function Home() {

  const context = useContext(Context);
  const {resumeId} = context.configState;
  const resumeContent = context.resumeContent;
  const {getLastState, updateUserMeta} = context;

  useEffect(() => {
    if (!resumeId) onLoad();
    if (resumeId) updateUserMeta(resumeId, resumeContent); 
  }, [resumeId]);

  async function onLoad() {
    try {
      await getLastState();
    } catch (err) {
      onError(err)
    }
  }

  return (
    <>
      <Nav />
      <ResumeEditor />
      <ReactTooltip /> 
    </>
  )
};