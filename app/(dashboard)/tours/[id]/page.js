import TourInfo from '@/components/TourInfo';
import TourInfoSepearate from '@/components/TourInfoSepearate';
import { generateTourImage, getSingleTour } from '@/utils/action';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import axios from 'axios';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTour = async ({params}) => {
  const tour = await getSingleTour(params.id);
  if(!tour){
    redirect('/tours');
  }

  const {data} = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  // const tourImage = await generateTourImage({city: tour.city, country: tour.country})



  return (
    <div>
    <Link href='/tours' className='btn btn-secondary mb-12'>Back to Tours</Link>
      {
        tourImage ? (
        <div><Image src={tourImage} width={300} height={300} className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover' alt={tour.title} priority /> </div> ) : null  
      }
      <TourInfo tour={tour} />
      </div>
  )
}

// const SingleTour = async ({params}) => {
//     const queryClient = new QueryClient();
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <TourInfoSepearate id={params.id}/>
//     </HydrationBoundary>
//   )
// }




export default SingleTour