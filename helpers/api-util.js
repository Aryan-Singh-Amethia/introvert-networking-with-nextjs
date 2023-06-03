import { initializeApp } from 'firebase/app';
import { getDatabase , ref , onValue} from 'firebase/database';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAqER9588vA7EvaAUwZ_YuPiIclYnP1KWE",
  
    authDomain: "nextjs-project-dc5d4.firebaseapp.com",
  
    databaseURL: "https://nextjs-project-dc5d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "nextjs-project-dc5d4",
  
    storageBucket: "nextjs-project-dc5d4.appspot.com",
  
    messagingSenderId: "602321529798",
  
    appId: "1:602321529798:web:318691715fbab93ab120c7"
  
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getAllEvents(){
    // const events = [];
    // const eventsRef = ref(db,'events');
    // onValue(eventsRef,(snapshot)=>{
    //   console.log('SNAPSHOT ==> ',snapshot.val());
    //   events.push(snapshot.val());
    // });
    // return events;

    const response = await fetch('https://nextjs-project-dc5d4-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
    const data = await response.json();
    //console.log('DATA :: ==>',data);
    let events = [];
    for(let key in data){
       events.push({
        id : key,
        ...data[key]
       });
    }
    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    console.log('ALL EVENTS :: ==>',allEvents);
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events = await getAllEvents();
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }

