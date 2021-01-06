import React from 'react';
import Nav from '../components/Nav';
import ResumeEditor from './ResumeEditor';
import ReactTooltip from "react-tooltip";

export default function Home() {

  return (
    <>
      <Nav />
      <ResumeEditor />
      <ReactTooltip /> 
    </>
  )
};