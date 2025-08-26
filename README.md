# Airbnb Clone with Maps and Category Filtering

A full-stack Airbnb clone built with Node.js, Express, MongoDB, and EJS templates featuring interactive maps and category-based filtering.

## Features

### 🗺️ Interactive Maps
- **Leaflet.js integration** for free, open-source mapping
- **Real coordinates** from actual locations around the world
- **Auto-geocoding** using Nominatim (OpenStreetMap) - no API keys required
- Maps display on individual listing pages showing exact locations

### 🏷️ Category Filtering
- **10 categories**: Trending, Rooms, Iconic Cities, Mountains, Castles, Pools, Camping, Farms, Arctic, Deserts
- **Real-time filtering** via URL parameters
- **Global locations** with authentic coordinates

### 🌍 Real Database
- **35+ authentic listings** from different countries
- **Real coordinates** for actual tourist destinations
- **Comprehensive data** including descriptions, prices, and locations

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up MongoDB
Make sure MongoDB is running locally or set your `MONGODB_URI` environment variable.

### 3. Seed the Database
```bash
npm run seed
```

This will populate your database with 35+ real listings from around the world, including:
- **India**: Manali, Mumbai, Goa, Jaipur, Rishikesh
- **United States**: Aspen, New York, Napa Valley, Alaska, Hawaii
- **Europe**: Switzerland, France, Scotland, Italy, Iceland
- **Asia**: Japan, Thailand, Indonesia, Mongolia
- **Africa**: Morocco, Tanzania, Zimbabwe
- **Oceania**: Australia, New Zealand, Fiji

### 4. Start the Application
```bash
npm start
# or
npm run dev
```

## How to Use

### Browse Listings
- Visit `/listings` to see all listings
- Use category filters at the top to filter by type
- Click on any listing card to view details

### View Maps
- Click on any listing to see its detail page
- Scroll down to see the interactive map (if coordinates exist)
- Maps show the exact location using real coordinates

### Create New Listings
- Use the "Create New Listing" form
- Fill in location and country
- Click "Auto-Fill Coordinates" to automatically get coordinates
- Or manually enter latitude/longitude
- Select a category from the dropdown

### Category Filtering
- Click category pills at the top of the listings page
- Or use URLs like:
  - `/listings?category=mountains`
  - `/listings?category=pools`
  - `/listings?category=castles`

## Technical Details

### Map Integration
- **Leaflet.js 1.9.4** for interactive maps
- **OpenStreetMap tiles** for free map data
- **GeoJSON Point** format for coordinates
- **Responsive design** that works on all devices

### Geocoding
- **Nominatim API** (OpenStreetMap) for address-to-coordinates conversion
- **No API keys required** - completely free
- **Rate limiting** handled gracefully
- **Fallback support** for manual coordinate entry

### Database Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  category: String (enum),
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  image: { url: String, filename: String },
  owner: ObjectId (ref: User),
  reviews: [ObjectId] (ref: Review)
}
```

## Categories Available

1. **trending** - Popular and trending destinations
2. **rooms** - Traditional room accommodations
3. **iconic** - Famous city locations and landmarks
4. **mountains** - Mountain retreats and alpine experiences
5. **castles** - Historic castles and palaces
6. **pools** - Properties with amazing pools
7. **camping** - Outdoor camping experiences
8. **farms** - Farm stays and rural experiences
9. **arctic** - Cold weather and northern destinations
10. **deserts** - Desert experiences and camps

## Contributing

Feel free to add more listings, improve the map functionality, or enhance the category system!

## License

This project is open source and available under the MIT License.
