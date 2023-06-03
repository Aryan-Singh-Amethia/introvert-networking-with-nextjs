import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import useSWR from 'swr';
import axios from "axios";

// const fetchDataFromFirebase = async ()=>{
//     const res = await axios.get('https://nextjs-project-dc5d4-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'); 
//     console.log('res==>',res.data);
//     return res.data;
// }

const FilteredEvenetsPage = (props) => {
  const router = useRouter();

  const [loadedEvents,setLoadedEvents] = useState([]);

  const filterData = router.query.slug;
  //console.log('filterData::',filterData);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const {data,error} = useSWR('https://nextjs-project-dc5d4-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',fetcher);
  console.log('DATA==>',data);
  useEffect(()=>{
    if(data){
      const events = [];
      for(let key in data) {
        events.push({
          id : key,
          ...data[key]
        });
      }
      console.log('events==>',events);
      setLoadedEvents(events);
    }
  },[data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (     
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 
    ) {
    return <Fragment>
    <ErrorAlert>
    <p>Invalid filter. Please adjust the values</p>
    </ErrorAlert>
    <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
  </Fragment>
  }

  const filteredEvents = loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

  //const filteredEvents = props.events;
  if(!filteredEvents || filteredEvents.length===0){
    return (
      <Fragment>
        <ErrorAlert>
        <p>No events found for the chosen filter !!</p>
        </ErrorAlert>
        <div className="center" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  //const date = new Date(props?.date?.year,props?.date?.month-1);

  const date = new Date(numYear,numMonth);

  return <Fragment>
    <ResultsTitle date={date}/>
    <EventList items={filteredEvents}/>
  </Fragment>
};

// export async function getServerSideProps(context){
//   const { params } = context;
//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props : { hasError : true}
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//        year : numYear,
//        month : numMonth
//   });


//   return {
//     props : {
//        events : filteredEvents,
//        date : {
//         year : numYear ,
//         month : numMonth
//        }
//     }
//   }

// }

export default FilteredEvenetsPage;
