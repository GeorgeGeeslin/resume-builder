import React, {useEffect, useContext} from 'react';
import Context from '../context/Context';
import { onError } from "../libs/errorLib";
import Nav from '../components/Nav';
import ResumeEditor from './ResumeEditor';
import ReactTooltip from "react-tooltip";

export default function Home() {

  const context = useContext(Context);
  const {getAppState} = context;

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await getAppState();
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