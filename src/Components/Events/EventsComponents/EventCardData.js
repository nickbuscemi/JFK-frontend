import NYCmarathonHero from '../../../assets/images/eventImages/NYCmarathonHero.jpeg'
import BethpageGolfCourseHero from '../../../assets/images/eventImages/BethpageGolfCourseHero.jpeg'
import blockpartyHero from '../../../assets/images/eventImages/blockpartyHero.jpeg';

class Event {
  constructor(id, name, date, location, registrationFormComponent, image) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.registrationFormComponent = registrationFormComponent;
    this.image = image;
    this.link = this.createSlug();
  }

  createSlug() {
    return `/events/${this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-')}`;
  }
}

const upcomingEvents = [
  new Event(1, 'Annual Golf Tournament', 'September 2024', 'Bethpage', 'GolfTournamentRegistrationForm',BethpageGolfCourseHero),
  new Event(2, 'NYC Marathon', 'November 2024', 'New York City', 'MarathonRegistrationForm', NYCmarathonHero),
  new Event(3, 'Annual Block Party', 'June 2024', 'Islip', 'BlockPartyRegistrationForm', blockpartyHero),
  // Add more events
];

export default upcomingEvents;

