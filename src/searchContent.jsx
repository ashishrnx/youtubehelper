import { useState, React } from "react";
import { RiFileList2Line } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";

function SearchContent() {

  const searchContentStyle = {
    background: "linear-gradient(to right, black, #535353)",
    minHeight: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    padding: "20px",
  };

  const inputStyle = {
    width: "300px",
    color: "black",
    fontSize: "14px",
  };

  const boxStyle = {
    border: "1px solid lightgray",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
    backgroundColor: "whitesmoke",
    maxHeight: "400px", 
  overflowY: "auto",
    
  };

  const paragraphStyle = {
    margin: 0,
  };

  const [inputValue, setInputValue] = useState("");
  const [isSummary, setIsSummary] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState(null);
  const [isQuestions, setIsQuestions] = useState(false);

  const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

  const handleSummarizeClick = () => {
    setIsLoading(true);
    fetch("https://fastapi-ifb9.onrender.com/summary/?code=" + inputValue) // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedData(data["message"]); // Store the fetched data in state
        setIsLoading(false);
        setFetchedQuestions(null)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  };

  const handleQuestionsClick = () => {
   
    // setIsQuestions(true);
    if(fetchedQuestions!==null)
    {
      console.log("Not hitting api");
      return
    }
     setIsLoading(true);
    fetch("https://fastapi-ifb9.onrender.com/question/?code=" + inputValue +"&q=10") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedQuestions(data["message"]); // Store the fetched questions in state
        setIsLoading(false)
        // setIsQuestions(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false)
        // setIsQuestions(false);
      });
  };

  return (
    <section>
      <div style={searchContentStyle}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Unlocking Knowledge Through Videos
        </h1>
        <h4>Enter the YouTube Video code below</h4>
        <div style={{ textAlign: "center" }}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Paste URL YouTube"
              className="border-0 border-black rounded-lg p-2 mr-2"
              style={inputStyle}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="border border-black bg-yellow-600 text-white px-4 py-2 flex items-center space-x-2 rounded-md"
              onClick={handleSummarizeClick}
            >
              <RiFileList2Line className="h-5 w-5" />
              Summarize
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          className={`font-bold text-4xl focus:outline-none ${
            isSummary ? "text-black-500" : "text-gray-500"
          }`}
          onClick={() => {
            setIsSummary(true);
            setIsQuestions(false);
          }}
        >
          Summary
        </button>
        <button
          className={`font-bold text-4xl focus:outline-none ${
            isQuestions ? "text-black-500" : "text-gray-500"
          }`}
          onClick={() => {
            setIsSummary(false);
            setIsQuestions(true);
            handleQuestionsClick(); // Fetch questions when Questions button is clicked
          }}
        >
          Q&A
        </button>
      </div>

      <div style={boxStyle}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading </p>
            <FaSpinner className="animate-spin text-blue-500 ml-2" />
          </div>
        ) : isSummary ? (
          <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(fetchedData)
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\n/g, "\n")}
          </p>
        ) : isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading </p>
            <FaSpinner className="animate-spin text-blue-500 ml-2" />
          </div>
        ) : fetchedQuestions ? (
          <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(fetchedQuestions)
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\n/g, "\n")}
          </p>
        ) : (
          <p style={paragraphStyle}>No questions available</p>
        )}
      </div>
    </section>
  );
}

export default SearchContent;
