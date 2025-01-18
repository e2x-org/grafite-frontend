"use client"

import * as React from "react"

import "../styles/gpt.css"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import Bubble from "@/components/ui/chat-bubble"


export default function DropdownMenuCheckboxes() {
    return (
        <div className="grid grid-rows-[auto,1fr] h-screen">
            <div className="p-4 grid grid-cols-5 text-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><b>Chats</b></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuItem>
                            Chat 1
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Chat 2
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Chat 3
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <h1 className="col-span-3 text-4xl">GrafiteAI</h1>
            </div>
            <div className="grid p-4 grid-rows-[1fr,auto] overflow-hidden">
                <div className="chats overflow-y-scroll p-4">
                    <Bubble user={true}>Hello</Bubble>
                    <Bubble user={false}>Hi</Bubble>
                    <Bubble user={true}>How are you?</Bubble>
                </div>
                <div className="input grid gap-4 grid-cols-[1fr,auto]">
                    <Input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md p-4" />
                    <Button variant="outline" className="h-12">Send</Button>
                </div>
            </div>
        </div>
    )
}
