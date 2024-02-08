import NYCmarathonHero from '../../../assets/images/eventImages/NYCmarathonHero.jpeg'
import BethpageGolfCourseHero from '../../../assets/images/eventImages/BethpageGolfCourseHero.jpeg'
import blkprtyhero from '../../../assets/images/eventImages/blkprtyhero.jpeg'

class Event {
  constructor(id, name, date, location, registrationFormComponent, image, description) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.registrationFormComponent = registrationFormComponent;
    this.image = image;
    this.description = description;
    this.link = this.createSlug();
  }

  createSlug() {
    return `/events/${this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-')}`;
  }
}

const upcomingEvents = [
  new Event (
    1, 
    'Annual Golf Tournament', 
    'September 1st, 2024', 
    'Bethpage', 
    'GolfTournamentRegistrationForm',
    BethpageGolfCourseHero,
    "Golf tournament description"
  ),
  new Event (
    2, 
    'NYC Marathon', 
    'November 3rd, 2024', 
    'New York City', 
    'MarathonRegistrationForm', 
    NYCmarathonHero,
    'Run With Us!'
  ),
  new Event ( 
    3, 
    'Annual Block Party', 
    'June 7th, 2024', 
    'Islip', 
    'BlockPartyRegistrationForm', 
    blkprtyhero,
    'Block Party Description'
  ),
  // Add more events
];

export default upcomingEvents;

