"use client"

import * as React from "react"
import Head from "next/head"
import Script from "next/script"

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Bubble from "@/components/ui/chat-bubble"

import { remark } from 'remark';
import html from 'remark-html';
import Parser from 'html-react-parser';
import { ChevronDown, SendHorizontal } from "lucide-react"
import { func } from "prop-types"



export default function DropdownMenuCheckboxes() {
    const [mode, setMode] = React.useState("jee")
    const [chats, setChats] = React.useState({"aaaaa": "Chat 1"})
    const [currentChat, setCurrentChat] = React.useState("aaaaa")
    const [chatsContent, setchatsContent] = React.useState([])

    const [lastMsgTime, setLastMsgTime] = React.useState(0)

    const [emailDialogOpen, setEmailDialogOpen] = React.useState(false)

    function newChat() {
        const chatName = prompt("Enter chat name")
        if (!chatName) return
        const chatId = Math.random().toString(36).substring(7)
        setChats({ ...chats, [chatId]: chatName })
        saveChats({ ...chats, [chatId]: chatName })
        localStorage.setItem(`chats-${chatId}`, JSON.stringify([]))
        setCurrentChat(chatId)
        loadChatContent(chatId)
    }

    function loadChats() {
        // fetch chats from local storage
        let chatss = localStorage.getItem("chats")
        if (!chatss) {
            chatss = saveChats()
        } else {
            chatss = JSON.parse(chatss)
        }
        setChats(chatss)
    }

    function saveChats(chats_t = chats) {
        localStorage.setItem("chats", JSON.stringify(chats_t))
        return chats_t
    }

    function loadChatContent(chat_id = currentChat) {
        loadChats()
        let chatsContent = localStorage.getItem(`chats-${chat_id}`)
        if (!chatsContent) {
            return
        } else {
            chatsContent = JSON.parse(chatsContent)
        }
        setchatsContent(chatsContent)
    }

    function saveChatContent(chats_t = chatsContent) {
        saveChats()
        localStorage.setItem(`chats-${currentChat}`, JSON.stringify(chats_t))
    }

    function addChat(text, user) {
        if (!text) return
        setchatsContent([...chatsContent, { text, user }])
        const chat = document.querySelector(".chats")
        saveChatContent([...chatsContent, { text, user }])
        chat.scrollTop = chat.scrollHeight
    } 

    async function queryAI(query) {
        const payload = {
            "query": query,
            "dataset": mode,
            "conversation": chatsContent
        }
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        let data = await response.json()
        let result = await remark().use(html).process(data.answer)
        result = result.value
        result += "<br><h2>Similar Question:</h2><ul>"
        data.similar_questions.forEach((question) => {
            result += `<li><b>Q:</b>${question.question}<br><b>A:</b> ${question.answer}</li><br>`
        })
        result += "</ul>"
        return result
    }

    async function processQuery() {
        const text = document.querySelector(".input input").value
        if (!text) return
        if (Date.now() - lastMsgTime < 5000) {
            addChat("Please wait for 5 seconds before sending another message", false)
            return
        }
        addChat(text, true)
        document.querySelector(".input input").value = ""
        const chat = document.querySelector(".chats")
        setTimeout(() => {
            chat.scrollTop = chat.scrollHeight
        }, 500)
        let ans = await queryAI(text)

        setchatsContent([...chatsContent, { text: text, user: true }, { text: ans, user: false }])
        saveChatContent([...chatsContent, { text: text, user: true }, { text: ans, user: false }])
        
        setTimeout(() => {
            chat.scrollTop = chat.scrollHeight
        }, 500)
        setLastMsgTime(Date.now())
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            processQuery()
        }
    }

    function sendEmail() {
        const email = document.querySelector("#email").value
        fetch(`/api/email?email=${email}`)
        localStorage.setItem("email-submitted", "true")
        setEmailDialogOpen(false)
    }

    function dialogHandler() {
        setEmailDialogOpen(false)
        localStorage.setItem("email-submitted", "true")
    }

    React.useEffect(() => {
        loadChats()
        if (localStorage.getItem("email-submitted") !== "true") {
            setEmailDialogOpen(true)
        }
    }, [])

    return (
        <>
        <Head>
            <title>GrafiteAI</title>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        </Head>
        
        <Script
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
            }
        />
        <Dialog open={emailDialogOpen} onOpenChange={dialogHandler}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Stay Up To Date!</DialogTitle>
                    <DialogDescription>
                        Sign up for our newsletter to get the latest updates! (We promise not to spam you :3)
                    </DialogDescription>
                </DialogHeader>
                <Input
                id="email"
                type="email"
                className="col-span-3"
                />
                <DialogFooter>
                    <Button onClick={() => (window.open("https://discord.gg/unCVYP8YtV"))}>Join Discord</Button>
                    <Button type="submit" onClick={sendEmail}>Sign Up</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <div className="grid grid-rows-[auto,1fr] h-screen">
            <div className="p-4 grid grid-cols-5 text-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='bg-[#111111]' variant="outline"><b>Chats</b> <ChevronDown /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuItem onClick={newChat} >New Chat</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={currentChat} onValueChange={setCurrentChat}>
                            {Object.keys(chats).map((chat, index) => (
                                <DropdownMenuRadioItem key={index} value={chat} onClick={()=> {console.log(`${chat}: ${chats[chat]}`); loadChatContent(chat)}} >{chats[chat]}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <h1 className="col-span-3 text-4xl"><b>Grafite</b>AI</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='bg-[#111111]' variant="outline">{mode.toUpperCase()} <ChevronDown /></Button>
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
                        <Bubble key={index} user={chat.user}>{Parser(chat.text)}</Bubble>
                    ))}
                </div>
                <div className="input grid gap-4 grid-cols-[1fr,auto] pt-3">
                    <Input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md p-4" onKeyDown={handleKeyDown} />
                    <Button variant="outline" className="h-12 bg-[#111111]" onClick={processQuery}>Send <SendHorizontal /></Button>
                </div>
            </div>
        </div>
        </>
    )
}
