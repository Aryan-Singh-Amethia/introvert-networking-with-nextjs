import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getEventById } from '../../helpers/api-util';
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getAllEvents } from "@/dummy-data";

const EventDetailPage = (props) => {
  //const router = useRouter();
  //const eventId = router.query.eventId;
  //const event = getEventById(eventId);
  const event = props.selectedEvent;

  if (!event) {
    return <div className="center">
      <p>Loading ...</p>
    </div>
  }

  return (
    <Fragment>
      <EventSummary title={event.title}/>
      <EventLogistics
         date={event.date}
         address={event.location}
         image={event.image}
         imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context){
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    return {
      props : {
        selectedEvent : event
      }
    }
}

export async function getStaticPaths(){
  const events = await getAllEvents();

  const paths = events.map(e=>({params : {eventId : e.id}}));

  return {
    paths : paths,
    fallback : 'blocking',
  }
}


export default EventDetailPage;
