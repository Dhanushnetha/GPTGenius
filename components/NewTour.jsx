'use client'

import { createNewTour, fetchUserTokensById, generateTourResponse, getExsistingTour, subtractTokens } from "@/utils/action";
import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const NewTour = () => {
    const queryClient = useQueryClient();
    const {userId} = useAuth();
    const {mutate, isPending, data:tour } = useMutation({
        mutationFn: async (destination)=> {
            const exsistingTour = await getExsistingTour(destination);
            // console.log(exsistingTour, 'exsisitong tour');
            if(exsistingTour) return exsistingTour;

            const currentTokens = await fetchUserTokensById(userId);
            if(currentTokens < 300){
                toast.error('Token balance too low...');
                return;
            }

            const newTour = await generateTourResponse(destination);

            if(!newTour){
                toast.error('No matching city found...');
                return null;
            }
 
            await createNewTour(newTour.tour);
            queryClient.invalidateQueries({queryKey: ['tours']})
            const newTokens = await subtractTokens(userId, newTour.tokens);
            toast.success(`${newTokens} tokens remaining...`)
            return newTour.tour;
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