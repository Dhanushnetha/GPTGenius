'use client'

import { createNewTour, generateTourResponse, getExsistingTour } from "@/utils/action";
import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const NewTour = () => {

    const {mutate, isPending, data:tour } = useMutation({
        mutationFn: async (destination)=> {
            const newTour = await generateTourResponse(destination)
            if(newTour){
                return newTour
            }
            toast.error('No matching city found...');
            return null;
        },
        onSuccess: (data)=>{
            // console.log(data, 'dataaaaaaa');
        }
    })

    const handleSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries());
        mutate(destination);
    }

    if(isPending){
        return <span className="loading loading-lg"></span>
    }
    
  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
            <input type="text" className="input input-bordered join-item w-full" placeholder="City" name="city" required />
            <input type="text" className="input input-bordered join-item w-full" placeholder="Country" name="country" required />
            <button type="submit" className="btn btn-primary join-item">Generate tour</button>
        </div>
    </form>
    <div className="mt-16">
        {tour ? <TourInfo tour={tour}/> : null}
    </div>
    </>
  )
}

export default NewTour