"use client"

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble'
import { ChatInput } from '@/components/ui/chat/chat-input'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'

import '../styles/gpt.css'

function GrafiteGPT() {

    const [chat, setChat] = React.useState([
      {"user": "what is 2+2", "bot": "2+2 is equals to 4"},
    ])
    const [atHome, setHomeStatus] = React.useState(true)

    return (
    <>
    <div className="max-h-screen">
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
      <div className='p-4 grid grid-rows-[4fr_1fr]'> 
          <ChatMessageList className='overflow-y-scroll'>
            <ChatBubble variant='sent'>
                <ChatBubbleAvatar fallback='US' />
                <ChatBubbleMessage variant='sent'>
                Hello, how has your day been? I hope you are doing well.
                </ChatBubbleMessage>
            </ChatBubble>

            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage variant='received'>
                Hi, I am doing well, thank you for asking. How can I help you today?
                </ChatBubbleMessage>
            </ChatBubble>

<ChatBubble variant='received'>
    <ChatBubbleAvatar fallback='AI' />
    <ChatBubbleMessage variant='received'>
    Hi, I am doing well, thank you for asking. How can I help you today?
    </ChatBubbleMessage>
</ChatBubble>

<ChatBubble variant='received'>
    <ChatBubbleAvatar fallback='AI' />
    <ChatBubbleMessage variant='received'>
    Hi, I am doing well, thank you for asking. How can I help you today?
    </ChatBubbleMessage>
</ChatBubble>

<ChatBubble variant='received'>
    <ChatBubbleAvatar fallback='AI' />
    <ChatBubbleMessage variant='received'>
    Hi, I am doing well, thank you for asking. How can I help you today?
    </ChatBubbleMessage>
</ChatBubble>

<ChatBubble variant='received'>
    <ChatBubbleAvatar fallback='AI' />
    <ChatBubbleMessage variant='received'>
    Hi, I am doing well, thank you for asking. How can I help you today?
    </ChatBubbleMessage>
</ChatBubble>

            <ChatBubble variant='received'>
                <ChatBubbleAvatar fallback='AI' />
                <ChatBubbleMessage isLoading />
            </ChatBubble>
          </ChatMessageList>
          <form
              className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
              <ChatInput
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                  <Button size="sm" className="ml-auto gap-1.5">
                      Send Message
                  </Button>
              </div>
          </form>
      </div>
    </div>
    </>
  )
}

export default GrafiteGPT