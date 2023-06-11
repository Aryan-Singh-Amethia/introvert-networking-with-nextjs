import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/dummy-data'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const AllEventsPage = (props) => {
  const router = useRouter();
  const {events} = props;

  const findEventsHandler = (year,month) =>{
     const fullPath = `/events/${year}/${month}`;
     router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of events that help you evolve..'
           />
      </Head>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={events}/>
    </Fragment>
  )
}

export async function getStaticProps(){
  const events = await getAllEvents();
  return {
    props : {
      events : events,
      revalidate : 60
    }
  }
}

export default AllEventsPage