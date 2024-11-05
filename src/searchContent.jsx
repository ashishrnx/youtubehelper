"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FileText, Clipboard, X, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchContent = () => {
  const [inputValue, setInputValue] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [fetchedData, setFetchedData] = useState("");
  const [fetchedQuestions, setFetchedQuestions] = useState("");
  const [fetchedAnswer, setFetchedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [displayText, setDisplayText] = useState("");

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleQuestionChange = useCallback((event) => {
    setQuestionValue(event.target.value);
  }, []);

  const handlePasteClick = useCallback(async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      setInputValue(clipboardData);
    } catch (error) {
      console.error("Error pasting from clipboard:", error);
    }
  }, []);

  const handleSummarizeClick = useCallback(async () => {
    setIsLoading(true);
    setDisplayText("");
    setFetchedData("");
    setActiveTab("summary");
    try {
      const response = await fetch(
        `https://competitive-leela-soorvermesra-3f4a68c8.koyeb.app/summary/?code=${inputValue}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setFetchedData(data.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setFetchedData("Failed to load summary.");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue]);

  const handleQuestionsClick = useCallback(async () => {
    setIsLoading(true);
    setDisplayText("");
    setFetchedQuestions("");
    setActiveTab("qa");
    try {
      const response = await fetch(
        `https://competitive-leela-soorvermesra-3f4a68c8.koyeb.app/question/?code=${inputValue}&q=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedQuestions(data.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setFetchedQuestions("Failed to load questions.");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue]);

  const handleAskMeClick = useCallback(async () => {
    if (!questionValue) {
      setDisplayText("Please enter a question to get an answer.");
      return;
    }
    setIsLoading(true);
    setFetchedAnswer("");
    setDisplayText("");
    setActiveTab("askme");
    try {
      const response = await fetch(
        `https://competitive-leela-soorvermesra-3f4a68c8.koyeb.app/askme?code=${inputValue}&ques=${encodeURIComponent(
          questionValue
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedAnswer(data.message);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setFetchedAnswer("Failed to load answer.");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, questionValue]);

  useEffect(() => {
    if (isLoading) {
      setDisplayText("Loading...");
    } else {
      switch (activeTab) {
        case "summary":
          setDisplayText(
            fetchedData ||
              "Paste a YouTube URL and click 'Summarize' to get started."
          );
          break;
        case "qa":
          setDisplayText(
            fetchedQuestions ||
              "Paste a YouTube URL and click 'Q&A' to generate questions."
          );
          break;
        case "askme":
          setDisplayText(fetchedAnswer || "Ask a question to get an answer.");
          break;
        default:
          setDisplayText("");
      }
    }
  }, [activeTab, fetchedData, fetchedQuestions, fetchedAnswer, isLoading]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#FFDAB9] to-[#FA8072] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#8B4513] drop-shadow-lg">
          Unlocking Knowledge Through Videos
        </h1>
        <p className="text-xl text-center mb-8 text-[#8B4513]">
          Enter the YouTube Video code below
        </p>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Paste YouTube URL"
              className="w-full pr-10 bg-white/50 text-[#8B4513] placeholder-[#CD5C5C] border border-[#CD5C5C] rounded-lg py-2 px-4 focus:outline-none focus:border-[#8B4513] focus:ring focus:ring-[#8B4513]/50"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#CD5C5C] hover:text-[#8B4513] hover:bg-[#FFDAB9]/50 rounded-full p-1"
              onClick={() => {
                if (inputValue) {
                  setInputValue("");
                } else {
                  handlePasteClick();
                }
              }}
            >
              {inputValue ? <X size={20} /> : <Clipboard size={20} />}
            </button>
          </div>
          {activeTab === "askme" && (
            <div className="flex flex-col items-center space-y-2 w-full max-w-md">
              <input
                type="text"
                placeholder="Type your question here"
                className="w-full bg-white/50 text-[#8B4513] placeholder-[#CD5C5C] border border-[#CD5C5C] rounded-lg py-2 px-4 focus:outline-none focus:border-[#8B4513] focus:ring focus:ring-[#8B4513]/50"
                value={questionValue}
                onChange={handleQuestionChange}
              />
              <button
                onClick={handleAskMeClick}
                className="w-full bg-[#CD5C5C] hover:bg-[#8B4513] text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <HelpCircle size={20} />
                <span>Get Answer</span>
              </button>
            </div>
          )}
          {activeTab !== "askme" && (
            <button
              onClick={handleSummarizeClick}
              className="w-full max-w-md bg-[#CD5C5C] hover:bg-[#8B4513] text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <FileText size={20} />
              <span>Summarize</span>
            </button>
          )}
        </div>
        <div className="mt-12">
          <div className="flex w-full justify-between bg-[#FFDAB9]/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("summary")}
              className={`w-full text-center py-2 rounded-md ${
                activeTab === "summary"
                  ? "bg-white text-[#CD5C5C]"
                  : "text-[#8B4513]"
              }`}
            >
              Summary
            </button>
            <button
              onClick={handleQuestionsClick}
              className={`w-full text-center py-2 rounded-md ${
                activeTab === "qa"
                  ? "bg-white text-[#CD5C5C]"
                  : "text-[#8B4513]"
              }`}
            >
              Q&A
            </button>
            <button
              onClick={() => setActiveTab("askme")}
              className={`w-full text-center py-2 rounded-md ${
                activeTab === "askme"
                  ? "bg-white text-[#CD5C5C]"
                  : "text-[#8B4513]"
              }`}
            >
              Ask Me
            </button>
          </div>
          <div className="mt-4 bg-white/30 border border-[#CD5C5C] backdrop-blur-sm p-6 rounded-lg">
            <AnimatedText text={displayText} />
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimatedText = ({ text }) => {
  const words = text.split(" ");

  return (
    <motion.div className="space-y-2">
      <AnimatePresence>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="inline-block mr-1 text-[#8B4513] font-medium"
          >
            {word}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchContent;
