"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui_two/input";
import { ButtonTwo } from "./ui_two/button";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui_two/avatar";
import { CornerDownLeft, ClipboardCopy } from 'lucide-react';
import {
  BanIcon,
  BotIcon,
  LoaderIcon,
  SendHorizonalIcon,
  User,
} from "lucide-react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

const autoHighlight = (text: string) => {
  // Replace text surrounded by triple backticks with code blocks
  text = text.replace(/```(.*?)```/gs, (_, codeContent) => `<pre><code>${codeContent}</code></pre>`);
  // Replace double asterisks with bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Replace single asterisks with list items for bullet points
  text = text.replace(/\* (.*?)(?=(\* |$))/g, '<li>$1</li>');
  // Wrap the entire list in an unordered list <ul> tag
  text = `<ul>${text}</ul>`;
  return text;
};

const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };
  
  return (
    <div className="">
      <div className="flex flex-col inset-x-0 w-11/12 mt-5 mb-28 h-4/5 mx-auto sm:border-t-0 z-0 !important">
        <div>
          <ul>
            {messages.map(({ id, role, content }) => {
              const isUser = role === "user";

              return (
                <li
                  key={id}
                  className={`flex px-4 py-2.5 text-sm sm:text-base gap-x-2 rounded-xl ${!isUser ? "bg-muted/20 dark:" : ""}`}
                >
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className={isUser ? "" : "bg-transparent border"}>
                      {isUser ? <User /> : <BotIcon />}
                    </AvatarFallback>
                  </Avatar>

                  <div className="pt-2.5 sm:pt-2 whitespace-pre-wrap gap-x-1 flex-wrap" dangerouslySetInnerHTML={{ __html: autoHighlight(content) }} ></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="p-1 h-[92px] md:pl-56 inset-x-0 w-full z-50 justify-center fixed w-full right-0 bottom-0 flex items-center">
        <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex flex-wrap justify-center">
          <div className="bg-white border item-center shadow-sm from-transparent backdrop-blur-md w-full h-full justify-center py-3 px-3 rounded-t-2xl dark:bg-[#0c0a09]">
            <div className="relative flex w-full border-2 py-2 px-4 rounded-2xl bg-[#e5e7eb] dark:bg-[#000]">
              <Input
                value={input}
                placeholder={isLoading ? "" : "Ask Here..."}
                onChange={handleInputChange}
                type="search"
                disabled={isLoading}
                className="flex w-full pr-16 mr-3"
              />
              <ButtonTwo variant="outline">
                {isLoading && !input.trim() && (
                  <LoaderIcon className="animate-spin text-xs" />
                )}
                {!isLoading && !input.trim() && <CornerDownLeft />}
                {!isLoading && input.trim() && <CornerDownLeft />}
              </ButtonTwo>
            </div>
            <center className="text-xs pt-1 font-bold">
              <p>AI can make mistakes. Consider checking important information.</p>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}
