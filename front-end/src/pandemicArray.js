let cities = [{
    id: 1,
    name: "Cairo",
    color: "gray",
    cubes: 0,
    researchStation: false,    
    neighbors: ["Algiers","Istanbul","Baghdad","Riyadh"]
  },
  {
    id: 2,
    name: "Istanbul",
    color: "gray",
    cubes: 0,
    researchStation: false,    
    neighbors: ["Algiers","Milan","St. Petersburg","Moscow","Baghdad","Cairo"]
  },
  {
    id: 3,
    name: "Hong Kong",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Kolkata","Bangkok","Ho Chi Minh City","Manila","Taipei","Shanghai"]
  },
  {
    id: 4,
    name: "New York",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Montreal","Washington","Madrid","London"]
  },
  {
    id: 5,
    name: "Ho Chi Minh City",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Jakarta","Manila","Hong Kong","Bangkok"]

  },
  {
    id: 6,
    name: "Lagos",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Sao Paulo","Kinshasa","Khartoum"]
  },
  {
    id: 7,
    name: "Baghdad",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Istanbul","Tehran","Karachi","Riyadh","Cairo"]
  },
  {
    id: 8,
    name: "London",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["New York","Madrid","Paris","Essen"]
  },
  {
    id: 9,
    name: "Riyadh",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Cairo","Baghdad","Karachi"]

  },
  {
    id: 10,
    name: "Osaka",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Taipei","Tokyo"]
  },
  {
    id: 11,
    name: "San Francisco",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Manila","Tokyo","Los Angeles","Chicago"]
  },
  {
    id: 12,
    name: "Delhi",
    color: "gray",
    cubes: 0,
    researchStation: false, 
    neighbors: ["Tehran","Karachi","Mumbai","Chennai","Kolkata"]
  },
  {
    id: 13,
    name: "Washington",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Montreal","New York","Atlanta","Miami"]
  },
  {
    id: 14,
    name: "Khartoum",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Johannesburg","Kinshasa","Lagos","Cairo"]
  },
  {
    id: 15,
    name: "Karachi",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Riyadh","Baghdad","Tehran","Delhi","Mumbai"]
  },
  {
    id: 16,
    name: "Johannesburg",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Kinshasa","Khartoum"]
  },
  {
    id: 17,
    name: "Kinshasa",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Lagos","Khartoum","Johannesburg"]
  },
  {
    id: 18,
    name: "Paris",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["London","Essen","Milan","Algiers","Madrid"]
  },
  {
    id: 19,
    name: "Shanghai",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Hong Kong","Taipei","Tokyo","Seoul","Beijing"]
  },
  {
    id: 20,
    name: "Tehran",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Delhi","Karachi","Baghdad","Moscow"]
  },
  {
    id: 21,
    name: "Algiers",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Madrid","Paris","Istanbul","Cairo"]
  },
  {
    id: 22,
    name: "Chennai",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Mumbai","Delhi","Kolkata","Bangkok","Jakarta"]
  },
  {
    id: 23,
    name: "St. Petersburg",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Essen","Istanbul","Moscow"]
  },
  {
    id: 24,
    name: "Chicago",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["San Francisco","Los Angeles","Mexico City","Atlanta","Montreal"]
  },
  {
    id: 25,
    name: "Milan",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Essen","Paris","Istanbul","St. Petersburg"]
  },
  {
    id: 26,
    name: "Moscow",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["St. Petersburg","Istanbul","Tehran"]
  },
  {
    id: 27,
    name: "Sao Paulo",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Bogota","Buenos Aires","Lagos","Madrid"]

  },
  {
    id: 28,
    name: "Kolkata",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Delhi","Chennai","Bagkok","Hong Kong"]
  },
  {
    id: 29,
    name: "Miami",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Atlanta","Washington","Mexico City","Bogota"]
  },
  {
    id: 30,
    name: "Mexico City",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Lima","Bogota","Miami","Chicago","Los Angeles"]

  },
  {
    id: 31,
    name: "Lima",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Santiago","Bogota","Mexico City"]
  },
  {
    id: 32,
    name: "Essen",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["London","Paris","Milan","St. Petersburg"]
  },
  {
    id: 33,
    name: "Madrid",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["New York","London","Paris","Algiers","Sao Paulo"]
  },
  {
    id: 34,
    name: "Montreal",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Chicago","Washington","New York"]

  },
  {
    id: 35,
    name: "Los Angeles",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Sidney","San Francisco","Chicago","Mexico City"]
  },
  {
    id: 36,
    name: "Manila",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["San Francisco","Sidney","Ho Chi Minh City","Hong Kong","Taipei"]
  },
  {
    id: 37,
    name: "Tokyo",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Seoul","Shanghai","Osaka","San Francisco"]
  },
  {
    id: 38,
    name: "Bangkok",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Kolkata","Hong Kong","Ho Chi Minh City","Jakarta","Chennai"]
  },
  {
    id: 39,
    name: "Atlanta",
    color: "blue",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Washington","Chicago","Miami"]
  },
  {
    id: 40,
    name: "Taipei",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Shanghai","Osaka","Manila","Hong Kong"]
  },
  {
    id: 41,
    name: "Buenos Aires",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Bogota","Sao Paulo"]
  },
  {
    id: 42,
    name: "Sidney",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Los Angeles","Jakarta","Manila"]
  },
  {
    id: 43,
    name: "Beijing",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Shanghai","Seoul"]
  },
  {
    id: 44,
    name: "Bogota",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Mexico City","Miami","Sao Paulo","Buenos Aires","Lima"]
  },
  {
    id: 45,
    name: "Seoul",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Beijing","Shanghai","Tokyo"]
  },
  {
    id: 46,
    name: "Mumbai",
    color: "gray",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Karachi","Delhi","Chennai"]
  },
  {
    id: 47,
    name: "Jakarta",
    color: "red",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Chennai","Bangkok","Ho Chi Minh City","Sidney"]
  },
  {
    id: 48,
    name: "Santiago",
    color: "yellow",
    cubes: 0,
    researchStation: false,     
    neighbors: ["Lima"]
  },
]

export default cities;
