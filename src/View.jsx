import React from 'react'
// import EditorConv from './components/EditorConv'
import {useEffect, useState, useCallback} from "react"
import { EditorState, convertToRaw } from 'draft-js';
// import EditorConvertToText from './components/EditorConvertToText';
import RichTextEditor from './components/RichTextEditor'
import EditorConvertToText from './components/EditorConvertToText';



    function View(props) {

      // MY STATE
      const [editorState, setEditorState] = useState({editorState: EditorState.createEmpty()});
    
      // MY CALLBACKS ATTEMPTS
      const onChangeCallback = useCallback((editorState) => {
        console.log("hhhhh")
        const contentState = editorState.getCurrentContent();
        console.log(convertToRaw(contentState))
        setEditorState({editorState});
      }, [editorState]); 

      console.log(editorState)


      // const onChangeCallback = useCallback((editorState) => {
      //   const contentState = editorState.getCurrentContent();
      //   console.log(convertToRaw(contentState))
      //   setEditorState({editorState});
      // }, []); 
      // const onChangeCallback = ({editorState}) => { 
      //   setEditorState({editorState});
      // }
    
      return (
        <div>
    
          <div className="app__body">
            {editorState && <EditorConvertToText editorState={editorState} onChangeCallback={onChangeCallback} /> }
        </div>
    
        </div>
      )
    }
    
  export default View;