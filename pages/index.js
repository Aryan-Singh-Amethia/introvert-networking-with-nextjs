import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getFeaturedEvents } from '../helpers/api-util';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export default function HomePage(props) {
  //const featuredEvents = getFeaturedEvents();

  const router = useRouter();

  const findEventsHandler = (year,month)=>{
     const fullPath = `/events/${year}/${month}`;
     router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={props.events}/>
    </Fragment>
  )
}

export async function getStaticProps(){

  const featuredEvents = await getFeaturedEvents();

  return {
     props : {
      events : featuredEvents,
      revalidate : 1800
     }
  }
}
