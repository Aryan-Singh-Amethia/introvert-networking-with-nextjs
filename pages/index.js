import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getFeaturedEvents } from '../helpers/api-util';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

export default function HomePage(props) {
  //const featuredEvents = getFeaturedEvents();

  const router = useRouter();

  const findEventsHandler = (year,month)=>{
     const fullPath = `/events/${year}/${month}`;
     router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta 
           name="description"
           content='Find a lot of events that help you evolve..'
           />
      </Head>
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
