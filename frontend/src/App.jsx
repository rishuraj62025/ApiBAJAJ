import { useState } from "react";
import axios from "axios";
function App() {
  const [response,setRes]=useState({
      is_success:"",
      user_id: "",
      email: "",
      roll_number: "",
      numbers:"",
      alphabets:"",
      highest_lowercase_alphabet:"",
      is_prime_found:"",
  });
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [filter,setfilter]=useState("Numbers");

  const handleFilter=(e)=>{
    setfilter(e.target.value);
  }

  const handleChange = (e) => {
      setInput(e.target.value);
      setIsValid(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    try {
        const jsonData = JSON.parse(input);
        setParsedData(jsonData);
        setIsValid(true);
        console.log(parsedData);
        axios.post("https://api-bajaj-beta.vercel.app/bfhl",parsedData)
        .then((res)=>{
          setRes(res.data);
        })
        .catch((error)=>console.log(error));
    } catch (error) {
        setIsValid(false);
        setParsedData(null);
        console.log("submit error");
    }
};

  return (
    <>
      <div className="h-[100vh]">
          <form className=" bg-zinc-400 flex flex-col gap-4 w-[100%] h-[100%] px-[10rem] py-[2rem] border-2 shadow-lg rounded-lg " action="">
                <textarea className="w-[100%] border" rows="5" name="api-input" id="api-input" onChange={(e)=>handleChange(e)} placeholder="Data"></textarea>
                <button className="bg-green-400 rounded-lg p-4 text-lg font-semibold" onClick={(e)=>handleSubmit(e)}>submit</button>
                <select className="border" name="file" id="api-input" onChange={(e)=>handleFilter(e)}>
                  <option value="Numbers">Numbers</option>
                  <option value="Alphabets">Alphabets</option>
                  <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                </select>
                {filter=="Alphabets"?<div className="h-[50%] overflow-auto">
                  <p>Filterd Alphabets: {response.alphabets.toString()}</p>
                </div>:
                filter=="Numbers"?<div className="h-[50%] overflow-auto">
                <p>Filterd Numbers: {response.numbers.toString()}</p>
              </div>:
              filter=="Highest lowercase alphabet"?<div className="h-[50%] overflow-auto">
              <p>Higest-Lowercase-Alphabates: {response.highest_lowercase_alphabet.toString()}</p>
            </div>:""
              }
          </form>
      </div>
    </>
  )
}

export default App
