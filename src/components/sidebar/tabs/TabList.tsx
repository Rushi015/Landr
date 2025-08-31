"use client"
import { TabsList, TabsContent,TabsTrigger} from "@/components/ui/tabs";
import { Database,Plus,Settings2 } from "lucide-react";
import React from 'react'



const TabList = () => {
  return (
    <TabsList className="flex items-center flex-col justify-evenly w-full  h-fit gap-4">
            <TabsTrigger value="Settings" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Settings2 />
            </TabsTrigger>
            
            <TabsTrigger value="Components" className="data-[state=active]:bg-muted w-10 h-10 p-0">
                <Plus />
            </TabsTrigger>

           
            <TabsTrigger value="Media" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Database />
            </TabsTrigger>
        </TabsList>
  )
}

export default TabList