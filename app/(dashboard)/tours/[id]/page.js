import TourInfo from '@/components/TourInfo';
import TourInfoSepearate from '@/components/TourInfoSepearate';
import { getSingleTour } from '@/utils/action';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const SingleTour = async ({params}) => {
  const tour = await getSingleTour(params.id);
  if(!tour){
    redirect('/tours');
  }
  return (
    <div>
    <Link href='/tours' className='btn btn-secondary mb-12'>Back to Tours</Link>
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