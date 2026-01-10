'use client'

// //  start notifications skeleton

// /*
// -لما اخلص التاسك بتاعتي المفروض باستخدم 
// git pull dev 
// علشان اجيب كل الكود بتاعي زمايلي عندي في البروجيكت بتاعي واركب
// اي جزء في ال ui بتاعي ناقص
// بعد كده بعمل
// git add .
// git commit -m "my message"
// git push origin my branch-name not on dev
// then ask for review or pull request to dev
// -

// */ 


import { Bell } from "lucide-react";
import { BrushCleaning } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { Check } from "lucide-react";
import { Trash2 } from "lucide-react";
import { EllipsisVertical} from "lucide-react";


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Notifications() {
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
        <Button variant="outline"><Bell size={24} className="text-red-500"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 m-0 p-0 " align="start">
        <DropdownMenuLabel className="bg-maroon-700 p-4 text-white dark:bg-soft-pink-200 dark:text-zinc-800">Notifications (5)</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 dark:bg-zinc-700"> 
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-1">
                <BrushCleaning size={18} className="dark:text-zinc-500"/> <span className="dark:text-zinc-50">Clear all notifications</span>
             </div>
             <div className="flex items-center gap-1">
                 <CheckCheck size={18} className="dark:text-zinc-500"/> <span className="dark:text-zinc-50">Mark all as read</span>
              </div>
            </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-zinc-300'/>

          
        
        </DropdownMenuGroup>
        {/* first group */}
        <DropdownMenuGroup className="p-4 gap-2 dark:bg-zinc-900">
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex justify-between items-center w-full ">
                <h5 className="text-zinc-800 font-semibold text-base dark:text-zinc-50">Your Order Has Been Shipped</h5>
              <EllipsisVertical size={18} className='dark:text-zinc-400'/>
              </div>
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="gap-2 ml-2">
                <DropdownMenuItem> <Check size={18} className="text-zinc-500 dark:text-zinc-400"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Mark as read</span></DropdownMenuItem>
                <DropdownMenuItem> <Trash2 size={18} className="text-red-500"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Delete notificatione</span></DropdownMenuItem>
                
                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <p className="text-sm text-zinc-500 font-normal dark:text-zinc-400">Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery. In th...</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-zinc-300 dark:bg-zinc-600'/>



        {/* second */}
        <DropdownMenuGroup className="p-4 gap-2 dark:bg-zinc-900">
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex justify-between items-center w-full">
                <h5 className="text-zinc-800 font-semibold text-base dark:text-zinc-50">Your Order Has Been Shipped</h5>
              <EllipsisVertical size={18} className='dark:text-zinc-400'/>
              </div>
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="gap-2 ml-2">
                <DropdownMenuItem> <Check size={18} className="text-zinc-500 dark:text-zinc-400 "/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Mark as read</span></DropdownMenuItem>
                <DropdownMenuItem> <Trash2 size={18} className="text-red-500"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Delete notificatione</span></DropdownMenuItem>
                
                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <p className="text-sm text-zinc-500 font-normal dark:text-zinc-400">Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery. In th...</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator  className='bg-zinc-300 dark:bg-zinc-600'/> 

        {/* third */}
        <DropdownMenuGroup className="bg-zinc-200 gap-2 p-4 dark:bg-zinc-800 ">
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex justify-between items-center w-full">
                <h5 className="text-zinc-800 font-semibold text-base dark:text-zinc-50 ">Your Order Has Been Shipped</h5>
              <EllipsisVertical size={18} className='dark:text-zinc-400' />
              </div>
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="gap-2 ml-2">
                <DropdownMenuItem> <Check size={18} className="text-zinc-500 dark:text-zinc-400"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Mark as read</span></DropdownMenuItem>
                <DropdownMenuItem> <Trash2 size={18} className="text-red-500"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Delete notificatione</span></DropdownMenuItem>
                
                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <p className="text-sm text-zinc-500 font-normal dark:text-zinc-400">Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery. In th...</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator  className='bg-zinc-300 dark:bg-zinc-600'/>
       
         {/* fourth */}
         <DropdownMenuGroup className='p-4 gap-2 dark:bg-zinc-900'>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex justify-between items-center w-full">
                <h5 className="text-zinc-800 font-semibold text-base dark:text-zinc-50">Your Order Has Been Shipped</h5>
              <EllipsisVertical size={18} className='dark:text-zinc-400'/>
              </div>
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="gap-2 ml-2">
                <DropdownMenuItem> <Check size={18} className="text-zinc-500 dark:text-zinc-400"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Mark as read</span></DropdownMenuItem>
                <DropdownMenuItem> <Trash2 size={18} className="text-red-500"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Delete notificatione</span></DropdownMenuItem>
                
                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <p className="text-sm text-zinc-500 font-normal dark:text-zinc-400 ">Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery. In th...</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator  className='bg-zinc-300 dark:text-zinc-600'/>

        {/* fifth */}
        <DropdownMenuGroup className="bg-zinc-200 gap-2 p-4 dark:bg-zinc-800">
          
          <DropdownMenuSub  >
            <DropdownMenuSubTrigger >
              <div className="flex justify-between items-center w-full">
                <h5 className="text-zinc-800 font-semibold text-base dark:text-zinc-50">Your Order Has Been Shipped</h5>
              <EllipsisVertical size={18} className='dark:text-zinc-400'/>
              </div>
              </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className=" ml-2">
                <DropdownMenuItem> <Check size={18} className="text-zinc-500 dark:text-zinc-400"/> <span className="text-zinc-400 text-sm font-medium dark:text-zinc-50">Mark as read</span></DropdownMenuItem>
                <DropdownMenuItem> <Trash2 size={18} className="text-red-500"/> <span className="text-zinc-800 text-sm font-medium dark:text-zinc-50">Delete notificatione</span></DropdownMenuItem>
                
                
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem >
            <p className="text-sm text-zinc-500 font-normal dark:text-zinc-400">Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery. In th...</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator  className='bg-zinc-300 dark:text-zinc-600'/>

      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
