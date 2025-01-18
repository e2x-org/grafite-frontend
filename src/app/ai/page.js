"use client"

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


import '../styles/gpt.css'

function GrafiteGPT() {
    return (
    <>
    <div className="header grid grid-cols-5">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='grid-item inline m-3' variant="outline"><b>Chats</b></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Chat 1</DropdownMenuItem>
            <DropdownMenuItem>Chat 2</DropdownMenuItem>
            <DropdownMenuItem>Chat 3</DropdownMenuItem>
            <DropdownMenuItem>Chat 4</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="grid-item text-3xl text-center m-4 col-span-3">GrafiteAI</h1>
    </div>
    </>
  )
}

export default GrafiteGPT