import React from 'react'
import { Button } from '@/components/ui/button'

import '../styles/dashboard.css'

function Dashboard() {
    return (
        <div className="container">
            <div className="grid grid-cols-3 gap-4">
                <div className="grid-item">
                    <img src="https://api.dicebear.com/9.x/lorelei-neutral/png?seed=Adrian" alt="" />
                </div>
                <div className="grid-item col-span-2 text-left">
                    <h3 className='text-2xl'>Welcome</h3>
                    <h1 className='text-4xl'>Natya Vidhan</h1>
                    <Button className="mt-3">Check Progress</Button>
                </div>
                <h1 className="grid-item col-span-3 text-left text-3xl mt-5">Exams</h1>
                <div className="grid-item col-span-3 grid grid-cols-3 gap-4">
                    <Button className="grid-tem"><img src="/nta.jpeg" alt="" className='btn-icon' /> JEE Mains</Button>
                    <Button className="grid-tem">JEE Advance</Button>
                    <Button className="grid-tem">NEET</Button>
                    <Button className="grid-tem">WBJEE</Button>
                    <Button className="grid-tem">NDA</Button>
                </div>
                <h1 className="grid-item col-span-3 text-left text-3xl mt-5">Tools</h1>
                <div className="grid-item col-span-3 grid grid-cols-3 gap-4">
                    <Button className="grid-tem">Bookmarks</Button>
                    <Button className="grid-tem">Notes</Button>
                    <Button className="grid-tem">Flash Cards</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard