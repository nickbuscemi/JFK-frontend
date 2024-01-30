import killeenpic4 from '../../../assets/images/killeenpic4.jpeg'
import killeenpic1 from '../../../assets/images/killeenpic1.jpg'
import killeenpic2 from '../../../assets/images/killeenpic2.jpg'

import NYCmarathonHero from '../../../assets/images/eventImages/NYCmarathonHero.jpeg'
import BethpageGolfCourseHero from '../../../assets/images/eventImages/BethpageGolfCourseHero.jpeg'
import blockpartyHero from '../../../assets/images/eventImages/blockpartyHero.jpeg';

class Event {
  constructor(id, name, date, location, image) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.image = image;
    this.link = this.createSlug();
  }

  createSlug() {
    return `/events/${this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`;
  }
}

const upcomingEvents = [
  new Event(1, 'Annual Golf Tournament', 'September 2024', 'Bethpage', BethpageGolfCourseHero),
  new Event(2, 'NYC Marathon', 'November 2024', 'New York City', NYCmarathonHero),
  new Event(3, 'Annual Block Party', 'June 2024', 'Islip', blockpartyHero),
  new Event(1, 'Annual Golf Tournament', 'September 2024', 'Bethpage', BethpageGolfCourseHero),
  new Event(1, 'Annual Golf Tournament', 'September 2024', 'Bethpage', BethpageGolfCourseHero),
  new Event(1, 'Annual Golf Tournament', 'September 2024', 'Bethpage', BethpageGolfCourseHero),

  // Add more events
];

export default upcomingEvents;

