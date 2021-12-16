import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { Select } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "antd/dist/antd.css";

import "react-color-picker/index.css";
const { Option } = Select;

class EditorConvertToText extends Component {
  constructor(props) {
    super(props);
    
    this.state =  this.props.editorState; // <----- PASSED STATE
    this.onChange = this.props.onChangeCallback; //<----- PASSED CALLBACK

    const html = '<p id="para">asdfsd</p>';
    const contentBlock = htmlToDraft(html);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        background: "",
        isOpen: false,
        emailBody: `<p id="para">test</p>`,
        fontcolor: ""
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  onsubmit = () => {
    // var editorv = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;
    console.log(
      convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text
    );
  };

  onEditorChange = evt => {
    this.setState({
      emailBody: evt.editor.getData()
    });
  };

  componentDidMount() {
    document.getElementById("para").style.color = "red !important";
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
    document.getElementById(
      "test"
    ).style.backgroundColor = this.state.background;
  };
  handleChange = value => {
    this.setState(
      {
        fontcolor: value.toString()
      },
      () => {
        return (document.getElementById(
          "para"
        ).style.color = this.state.fontcolor);
      }
    );
  };
  handleChangeAlignment = data => {
    this.setState(
      {
        alignment: data.toString()
      },
      () => {
        return (document.getElementById(
          "para"
        ).style.textAlign = this.state.alignment);
      }
    );
  };
  handlebackground = data => {
    this.setState(
      {
        backgroundcolor: data.toString()
      },
      () => {
        return (document.getElementById(
          "para"
        ).style.backgroundColor = this.state.backgroundcolor);
      }
    );
  };

  render() {
    console.log(
      this.state.isOpen &&
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );

    const colors = [
      { id: "1", name: "red" },
      { id: "2", name: "black" },
      { id: "3", name: "white" }
    ];
    const back = [
      { id: "1", name: "red" },
      { id: "2", name: "black" },
      { id: "3", name: "white" }
    ];
    const AlignMent = [
      { id: "1", name: "center" },
      { id: "2", name: "left" },
      { id: "3", name: "right" }
    ];

    const { editorState } = this.state;
    console.log(this.state.editorState)
    return (
      <div>
        {
          draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
        <Select
          defaultValue={"backg"}
          onChange={this.handlebackground}
          style={{ width: "100%" }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {back.map(item => (
            <Option key={JSON.stringify(item.id)} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue={"selct"}
          onChange={this.handleChangeAlignment}
          style={{ width: "100%" }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {AlignMent.map(item => (
            <Option key={JSON.stringify(item.id)} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          size={10}
          defaultValue={"selct"}
          onChange={this.handleChange}
          style={{ width: "100%" }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {colors.map(item => (
            <Option key={JSON.stringify(item.id)} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        <p id="para">test</p>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <button onClick={this.onsubmit}>tst</button>
      </div>
    );
  }
}

export default EditorConvertToText

// import React, { PureComponent } from "react";
// import ReactDOM from "react-dom";
// import autosize from "autosize";
// import { Editor } from "react-draft-wysiwyg";
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// import { EditorState, ContentState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import { SketchPicker } from "react-color";
// import CKEditor from "ckeditor4-react";

// import { Select } from "antd";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "antd/dist/antd.css";

// import "react-color-picker/index.css";
// import "./styles.css";
// const { Option } = Select;

// export default class EditBlog extends PureComponent {
//   state = {
//     editor: EditorState.createEmpty(),
//     editorHTML: "",
//     showCode: false
//   };
//   onEditorChange = evt => {
//     this.setState({
//       emailBody: evt.editor.getData()
//     });
//   };

//   onEditorStateChange = editor => {
//     const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()));
//     this.setState({ editor, editorHTML });
//   };

//   onEditEditorHTML = e => {
//     const editorHTML = e.target.value;

//     let editor;
//     const contentBlock = htmlToDraft(editorHTML);
//     if (contentBlock) {
//       const contentState = ContentState.createFromBlockArray(
//         contentBlock.contentBlocks
//       );
//       editor = EditorState.createWithContent(contentState);
//     } else {
//       editor = EditorState.createEmpty();
//     }
//     this.setState({ editor, editorHTML });
//   };

//   toggleEditorCode = () => {
//     const { showEditorCode } = this.state;
//     this.setState({ showEditorCode: !showEditorCode }, () => {
//       if (!showEditorCode) {
//         autosize(this.textareaEditor);
//         autosize.update(this.textareaEditor);
//       } else {
//         autosize.destroy(this.textareaEditor);
//       }
//     });
//   };

//   submit = e => {
//     e.preventDefault();
//     const { editorHTML } = this.state;
//     console.log(editorHTML);
//   };

//   render() {
//     const { editor } = this.state;

//     return (
//       <form name="form" onSubmit={this.submit} autoComplete="off">
//         <div>
//         <Select
//           defaultValue={"backg"}
//           onChange={this.handlebackground}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {back.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           defaultValue={"selct"}
//           onChange={this.handleChangeAlignment}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {AlignMent.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           size={10}
//           defaultValue={"selct"}
//           onChange={this.handleChange}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {colors.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//           <Editor
//             editorState={editor}
//             editorClassName={"editor"}
//             onEditorStateChange={this.onEditorStateChange}
//             // toolbarCustomButtons={[<ShowEditorCode />]}
//           />
//         </div>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     );
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       background: "",
//       isOpen: false,
//       emailBody: `<p id="para">test</p>`,
//       fontcolor: ""
//     };
//   }
//   onEditorChange = evt => {
//     this.setState({
//       emailBody: evt.editor.getData()
//     });
//   };

//   componentDidMount() {
//     document.getElementById("para").style.color = "red !important";
//   }

//   handleChangeComplete = color => {
//     this.setState({ background: color.hex });
//     document.getElementById(
//       "test"
//     ).style.backgroundColor = this.state.background;
//   };
//   handleChange = value => {
//     this.setState(
//       {
//         fontcolor: value.toString()
//       },
//       () => {
//         return (document.getElementById(
//           "para"
//         ).style.color = this.state.fontcolor);
//       }
//     );
//   };
//   handleChangeAlignment = data => {
//     this.setState(
//       {
//         alignment: data.toString()
//       },
//       () => {
//         return (document.getElementById(
//           "para"
//         ).style.textAlign = this.state.alignment);
//       }
//     );
//   };
//   handlebackground = data => {
//     this.setState(
//       {
//         backgroundcolor: data.toString()
//       },
//       () => {
//         return (document.getElementById(
//           "para"
//         ).style.backgroundColor = this.state.backgroundcolor);
//       }
//     );
//   };
//   dd = () => {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   };
//   onsubmit = () => {
//     console.log(this.state.emailBody);
//   };
//   render() {
//     const colors = [
//       { id: "1", name: "red" },
//       { id: "2", name: "black" },
//       { id: "3", name: "white" }
//     ];
//     const back = [
//       { id: "1", name: "red" },
//       { id: "2", name: "black" },
//       { id: "3", name: "white" }
//     ];
//     const AlignMent = [
//       { id: "1", name: "center" },
//       { id: "2", name: "left" },
//       { id: "3", name: "right" }
//     ];

//     return (
//       <div>
//         <CKEditor
//           type="inline"
//           data={this.state.emailBody}
//           config={{
//             allowedContent: true
//           }}
//           onChange={this.onEditorChange}
//           onFocus={() => null}
//           onBlur={() => null}
//           onSelectionChange={evt => null}
//         />
//         <button onClick={this.onsubmit}>tst</button>

//         { ReactHtmlParser(this.state.emailBody)}

//         <Select
//           defaultValue={"backg"}
//           onChange={this.handlebackground}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {back.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           defaultValue={"selct"}
//           onChange={this.handleChangeAlignment}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {AlignMent.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//         <Select
//           size={10}
//           defaultValue={"selct"}
//           onChange={this.handleChange}
//           style={{ width: "100%" }}
//           showSearch
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
//             0
//           }
//         >
//           {colors.map(item => (
//             <Option key={JSON.stringify(item.id)} value={item.name}>
//               {item.name}
//             </Option>
//           ))}
//         </Select>
//         {this.state.isOpen && (
//           <SketchPicker
//             color={this.state.background}
//             onChangeComplete={this.handleChangeComplete}
//           />
//         )}
//         <div id="test" onClick={this.dd}>
//           <p id="para">test</p>
//         </div>
//       </div>
//     );
//   }
// }
// ReactDOM.render(<App />, document.getElementById("root"));




 