import fs from 'fs';

import { Place, sequelize } from '../server/sequelize';

function importPlaces() {
  const PlacesData = JSON.parse(fs.readFileSync('.json_data/places.json', 'UTF-8'));

  PlacesData.map((place) => {
    let address;
    let housenumber;
    let street;
    let city;
    let phone;
    let email;
    let website;
    let cuisine;
    let openingHours;


    if ((place.tags['addr:housenumber'] || place.tags['contact:housenumber']) && (place.tags['addr:street'] || place.tags['contact:street'])) {
      housenumber = place.tags['addr:housenumber'] || place.tags['contact:housenumber'];
      street = place.tags['addr:street'] || place.tags['contact:street'];
      address = `${housenumber} ${street}`;
    } else if (place.tags['addr:street'] || place.tags['contact:street']) {
      street = place.tags['addr:street'] || place.tags['contact:street'];
      address = `${street}`;
    }

    if ((place.tags['addr:city'] || place.tags['contact:city'])) {
      city = place.tags['addr:city'] || place.tags['contact:city'];
    }

    const reg = /^(?:(?:\+|00)33|0)\s*([1-9])(?:[\s.-]*(\d{2}))(?:[\s.-]*(\d{2}))(?:[\s.-]*(\d{2}))(?:[\s.-]*(\d{2}))$/;
    if (place.tags.phone) {
      const phoneArray = place.tags.phone.match(reg);

      phone = `0${phoneArray[1]} ${phoneArray[2]} ${phoneArray[3]} ${phoneArray[4]} ${phoneArray[5]}`;
    } else if (place.tags['contact:phone']) {
      const phoneArray = place.tags['contact:phone'].match(reg);

      phone = `0${phoneArray[1]} ${phoneArray[2]} ${phoneArray[3]} ${phoneArray[4]} ${phoneArray[5]}`;
    }

    if (place.tags.email || place.tags['contact:email']) {
      email = place.tags.email || place.tags['contact:email'];
    }

    if (place.tags.website || place.tags['contact:website'] || place.tags['brand:website']) {
      website = place.tags.website || place.tags['contact:website'] || place.tags['brand:website'];
    }

    if (place.tags.cuisine) {
      const listOfCuisine = place.tags.cuisine.split(';');

      [cuisine] = listOfCuisine;
    }

    if (place.tags.opening_hours) {
      const mapObj = {
        Mo: 'Lu',
        Tu: 'Ma',
        We: 'Me',
        Th: 'Je',
        Fr: 'Ve',
        Su: 'Di',
      };
      openingHours = place.tags.opening_hours.replace(/Mo|Tu|We|Th|Fr|Su/gi, matched => mapObj[matched]);
    }

    return (Place
      .findOrCreate({
        where: {
          name: place.tags.name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
          type: place.tags.amenity,
          address,
          city,
          phone,
          email,
          website,
          cuisine,
          opening_hours: openingHours,
        }
      })
    );
  });
}

sequelize.sync()
  .then(() => {
    importPlaces();
  })
  .then(() => {
    sequelize.close();
  });
