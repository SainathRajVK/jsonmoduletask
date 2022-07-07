import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios, { Axios } from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import "./styles.css";

//API Fetching JSON FIlE
function App() {

  const [data_file, setData_file] = useState(null);
  const [new_file, setnew_file] = useState({});
//Data fetched and stored instate
  const fetchData = async () => {
    let data = await axios.get('http://localhost:3000/getfile');
    let file = data.data;
    console.log(file);
    setData_file(file);
  }

//target value change
  const handleChange = (v) => {
    console.log(v);
    setnew_file({ ...v });
  };

  const saveFileData = async () => {
    let res = axios.post('http://localhost:3000/savefile', { "new_file": new_file })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <div className="con">
        {(data_file) && <Editor key={data_file} value={data_file} onChange={handleChange} />}
        <button onClick={() => { saveFileData() }}>Save!</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
