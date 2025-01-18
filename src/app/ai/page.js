"use client"

import * as React from "react"

import "../styles/gpt.css"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import Bubble from "@/components/ui/chat-bubble"



export default function DropdownMenuCheckboxes() {
    const [mode, setMode] = React.useState("jee")
    const [chats, setChats] = React.useState({
        "ajksh": "Chat One",
        "ghjgy": "Chat Two",
        "cvbcb": "Chat Three"
    })
    const [currentChat, setCurrentChat] = React.useState("ajksh")
    const [chatsContent, setchatsContent] = React.useState([
        { user: true, text: "Hello" },
        { user: false, text: "Hi" },
        { user: true, text: "How are you?" }
    ])

    const [lastMsgTime, setLastMsgTime] = React.useState(0)

    function loadChats() {
        // fetch chats from local storage
        let chats = localStorage.getItem("chats")
        if (!chats) {
            return
        } else {
            chats = JSON.parse(chats)
        }
        setchatsContent(chats[currentChat])
    }

    function addChat(text, user) {
        if (!text) return
        setchatsContent([...chatsContent, { text, user }])
        const chat = document.querySelector(".chats")
        chat.scrollTop = chat.scrollHeight
    } 

    function queryAI(query) {
        
    }

    function processQuery() {
        const text = document.querySelector(".input input").value
        if (!text) return
        if (Date.now() - lastMsgTime < 5000) {
            addChat("Please wait for 5 seconds before sending another message", false)
            return
        }
        addChat(text, true)
        document.querySelector(".input input").value = ""
        setLastMsgTime(Date.now())
    }

    return (
        <div className="grid grid-rows-[auto,1fr] h-screen">
            <div className="p-4 grid grid-cols-5 text-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><b>Chats</b></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        {/* <DropdownMenuItem>
                            Chat 1
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Chat 2
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Chat 3
                        </DropdownMenuItem> */}
                        {/* {Object.keys(chats).map((chat, index) => (
                            <DropdownMenuRadioItem key={index}>{chats[chat]}</DropdownMenuRadioItem>
                        ))} */}
                        <DropdownMenuRadioGroup value={currentChat} onValueChange={setCurrentChat}>
                            {Object.keys(chats).map((chat, index) => (
                                <DropdownMenuRadioItem key={index} value={chat}>{chats[chat]}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <h1 className="col-span-3 text-4xl">GrafiteAI</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{mode}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>
                            <DropdownMenuRadioItem value="jee">JEE</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="neet">NEET</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid p-4 grid-rows-[1fr,auto] overflow-hidden">
                <div className="chats overflow-y-scroll p-4">
                    {chatsContent.map((chat, index) => (
                        <Bubble key={index} user={chat.user}>{chat.text}</Bubble>
                    ))}
                </div>
                <div className="input grid gap-4 grid-cols-[1fr,auto]">
                    <Input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md p-4" />
                    <Button variant="outline" className="h-12" onClick={processQuery}>Send</Button>
                </div>
            </div>
        </div>
    )
}
