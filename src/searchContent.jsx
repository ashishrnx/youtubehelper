import { useState } from "react";
import { RiFileList2Line } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    width: "100%",
    color: "black",
    fontSize: "14px",
    paddingRight: "40px", // added space for the button
  };

  const boxStyle = {
    border: "1px solid lightgray",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "700px",
    margin: "auto",
    marginTop: "8px",
    backgroundColor: "whitesmoke",
    maxHeight: "400px",
    overflowY: "auto",
  };

  const buttonStyle =
    "border border-black bg-yellow-600 text-white px-4 py-2 flex items-center space-x-2";

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

  const handlePasteClick = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      setInputValue(clipboardData);
    } catch (error) {
      console.error("Error pasting from clipboard:", error);
    }
  };

  const handleSummarizeClick = () => {
    setIsLoading(true);
    fetch(
      "https://helpful-monica-soorveer-39ac911c.koyeb.app/summary/?code=" +
        inputValue
    ) // Replace with your actual API endpoint
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
        setFetchedQuestions(null);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  };

  const handleQuestionsClick = () => {
    if (fetchedQuestions !== null) {
      console.log("Not hitting api");
      return;
    }
    setIsLoading(true);
    fetch(
      "https://helpful-monica-soorveer-39ac911c.koyeb.app/question/?code=" +
        inputValue +
        "&q=10"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedQuestions(data["message"]); // Store the fetched questions in state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  };

  return (
    <section className="w-full">
      <div style={searchContentStyle}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4">
          Unlocking Knowledge Through Videos
        </h1>
        <h4 className="text-lg mb-4">Enter the YouTube Video code below</h4>
        <div className="w-full max-w-md px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Paste URL YouTube"
                className="border-0 border-black rounded-lg p-2 w-full"
                style={inputStyle}
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className={`${buttonStyle} absolute right-1 top-1/2 transform -translate-y-1/2 rounded-lg`}
                onClick={() => {
                  if (inputValue) {
                    setInputValue("");
                  } else {
                    handlePasteClick();
                  }
                }}
              >
                {inputValue ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faPaste} />
                )}
              </button>
            </div>
            <button
              className={`${buttonStyle} md:rounded-md rounded-lg md:flex-shrink-0 md:w-auto md:px-4 px-1 py-2`}
              onClick={handleSummarizeClick}
            >
              <RiFileList2Line className="h-5 w-5 " />
              <span className="hidden md:inline ">Summarize</span>
              <span className="md:hidden "></span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          className={`font-bold text-2xl md:text-3xl lg:text-4xl focus:outline-none ${
            isSummary ? "text-yellow-600" : "text-gray-500"
          }`}
          onClick={() => {
            setIsSummary(true);
            setIsQuestions(false);
          }}
        >
          Summary
        </button>
        <button
          className={`font-bold text-2xl md:text-3xl lg:text-4xl focus:outline-none ${
            isQuestions ? "text-yellow-600" : "text-gray-500"
          }`}
          onClick={() => {
            setIsSummary(false);
            setIsQuestions(true);
            handleQuestionsClick();
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
          <p className="whitespace-pre-wrap break-words">
            {JSON.stringify(fetchedData)
              .replace(/\\n\\n/g, "\n\n")
              .replace(/\\n/g, "\n")}
          </p>
        ) : fetchedQuestions ? (
          <p className="whitespace-pre-wrap break-words">
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
