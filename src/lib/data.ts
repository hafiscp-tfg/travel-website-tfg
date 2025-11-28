import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

function getImage(id: string): ImagePlaceholder {
  return PlaceHolderImages.find((img) => img.id === id) || PlaceHolderImages[0];
}

export const destinations = [
  {
    name: "Kerala",
    country: "India",
    price: 499,
    image: getImage("dest-wayanad"),
  },
  {
    name: "Paris",
    country: "France",
    price: 750,
    image: getImage("tour-europe-express"),
  },
  {
    name: "Tokyo",
    country: "Japan",
    price: 1200,
    image: getImage("dest-tokyo"),
  },
  {
    name: "Dubai",
    country: "UAE",
    price: 600,
    image: getImage("dest-dubai"),
  },
  {
    name: "Jeddah",
    country: "Saudi Arabia",
    price: 550,
    image: getImage("dest-jeddah"),
  },
  {
    name: "Munnar",
    country: "India",
    price: 300,
    image: getImage("dest-munnar"),
  },
];

export const tourPackages = [
  {
    id: 1,
    slug: 'munnar-tea-gardens-escape',
    title: "Munnar Tea Gardens Escape",
    category: "Kerala Packages",
    duration: "3 Days / 2 Nights",
    price: 8999,
    image: getImage("tour-munnar-wonder"),
    description: "Immerse yourself in the lush green tea plantations of Munnar. This package includes a stay at a scenic resort, a guided tour of the tea gardens, and a visit to the Tea Museum.",
    inclusions: ["Accommodation", "Breakfast", "Sightseeing", "Tea Museum Entry"],
    exclusions: ["Flights", "Lunch & Dinner", "Personal Expenses"],
  },
  {
    id: 2,
    slug: 'alleppey-backwater-dream',
    title: "Alleppey Backwater Dream",
    category: "Kerala Packages",
    duration: "2 Days / 1 Night",
    price: 12500,
    image: getImage("tour-alleppey-dreams"),
    description: "Experience the famous Kerala backwaters with an overnight stay in a traditional houseboat. Enjoy local cuisine and the serene beauty of Alleppey.",
    inclusions: ["Houseboat Stay", "All Meals on Houseboat", "Canoe Trip"],
    exclusions: ["Transportation to Alleppey", "Personal Expenses"],
  },
  {
    id: 3,
    slug: 'dubai-delight',
    title: "Dubai Delight",
    category: "International",
    duration: "5 Days / 4 Nights",
    price: 35000,
    image: getImage("tour-dubai-delight"),
    description: "Explore the futuristic city of Dubai. This trip covers the Burj Khalifa, Dubai Mall, a desert safari, and a dhow cruise.",
    inclusions: ["4-star Hotel Stay", "Daily Breakfast", "Desert Safari with BBQ Dinner", "Burj Khalifa 'At The Top' ticket"],
    exclusions: ["Flights", "Visa", "Tourism Dirham Fee"],
  },
  {
    id: 4,
    slug: 'european-express',
    title: "European Express",
    category: "International",
    duration: "10 Days / 9 Nights",
    price: 120000,
    image: getImage("tour-europe-express"),
    description: "A whirlwind tour of Europe's most iconic cities: Paris, Rome, and Venice. Perfect for first-time visitors to the continent.",
    inclusions: ["3-star Hotel Stays", "Daily Breakfast", "City Tours in each city", "Train tickets between cities"],
    exclusions: ["Flights", "Schengen Visa", "Lunches & Dinners"],
  },
];

export const flights = [
    { id: 'AI-234', airline: 'Air India', from: 'CCJ', to: 'DXB', departureTime: '08:30', arrivalTime: '11:00', duration: '4h 30m', stops: 0, price: 12000 },
    { id: 'IX-345', airline: 'Air India Express', from: 'CCJ', to: 'DXB', departureTime: '14:00', arrivalTime: '16:30', duration: '4h 30m', stops: 0, price: 9500 },
    { id: 'EK-531', airline: 'Emirates', from: 'CCJ', to: 'DXB', departureTime: '10:05', arrivalTime: '12:35', duration: '4h 30m', stops: 0, price: 15500 },
    { id: '6E-1401', airline: 'IndiGo', from: 'CCJ', to: 'DXB', departureTime: '21:30', arrivalTime: '00:05', duration: '4h 35m', stops: 0, price: 11200 },
    { id: 'SG-53', airline: 'SpiceJet', from: 'CCJ', to: 'DXB', departureTime: '19:45', arrivalTime: '22:15', duration: '4h 30m', stops: 0, price: 10800 },
    { id: 'QR-537', airline: 'Qatar Airways', from: 'CCJ', to: 'DXB', departureTime: '04:10', arrivalTime: '10:45', duration: '8h 35m', stops: 1, stopLocation: 'DOH', price: 18000 },
    { id: 'SV-747', airline: 'Saudia', from: 'CCJ', to: 'JED', departureTime: '11:30', arrivalTime: '14:30', duration: '5h 30m', stops: 0, price: 18500 },
    { id: 'IX-373', airline: 'Air India Express', from: 'CCJ', to: 'JED', departureTime: '07:00', arrivalTime: '10:15', duration: '5h 45m', stops: 0, price: 16000 },
];


export const bookings = [
    { id: 'SH-1001', customer: 'Noel Philip', flight: 'EK-531', date: '2024-08-15', amount: 15500, status: 'Confirmed' },
    { id: 'SH-1002', customer: 'Ashna K', flight: 'IX-345', date: '2024-08-20', amount: 9500, status: 'Confirmed' },
    { id: 'SH-1003', customer: 'Rohan Mathew', flight: 'SV-747', date: '2024-09-01', amount: 18500, status: 'Pending' },
];

export const inquiries = [
    { id: 'INQ-501', name: 'Priya Sharma', type: 'Visa', subject: 'Schengen Visa for France', date: '2024-07-28', status: 'New' },
    { id: 'INQ-502', name: 'Anil Kumar', type: 'Tour', subject: 'Quote for Dubai Delight', date: '2024-07-27', status: 'Contacted' },
];
