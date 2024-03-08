'use client'

import { getSingleTour } from "@/utils/action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useState } from "react";
import TourInfo from "./TourInfo";
import Link from "next/link";

const TourInfoSepearate = ({id}) => {
    // const [tour, setData] = useState();
    // const queryClient = useQueryClient();
    const { isPending, data:tour } = useQuery({
        queryKey: ['tour', id],
        queryFn : ()=>  getSingleTour(id)
    })
    console.log(isPending, 'isPending')
    // if(isPending){
    //     return <span className="loading loading-spinner"></span>
    // }
    
  return (
    <>
    <Link href='/tours' className='btn btn-secondary mb-12'>Back to Tours</Link>
    <>
    {isPending ? <span className="loading loading-spinner"></span> : <TourInfo tour={tour}/>}
    </>
    </>
  )
}

export default TourInfoSepearate