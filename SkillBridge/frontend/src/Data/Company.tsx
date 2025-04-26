const companyData = {
  Google: {
    Name: "Google",
    Overview: "Google is a global leader in technology, specializing in internet-related services and products. Our mission is to organize the world’s information and make it universally accessible and useful. Founded by Larry Page and Sergey Brin, Google has grown into one of the most influential companies in the world, providing innovative tools and services that help billions of people across the globe.",
    Industry: "Internet, Software & Technology Services",
    Website: "https://www.google.com",
    Size: "100,000+ Employees",
    Headquarters: "Mountain View, California, United States",
    Specialties: [
      "Search Engine",
      "Online Advertising",
      "Cloud Computing",
      "Software",
      "Hardware",
      "AI & Machine Learning",
      "Mobile Operating Systems",
      "Consumer Electronics"
    ]
  },
  Meta: {
    Name: "Meta",
    Overview: "Meta is a technology company that brings people closer together through social media platforms and emerging technologies. Formerly known as Facebook, Meta focuses on building the metaverse — a shared virtual reality space — alongside its family of apps like Facebook, Instagram, and WhatsApp.",
    Industry: "Internet, Software & Technology Services",
    Website: "https://about.meta.com/",
    Size: "70,000+ Employees",
    Headquarters: "Menlo Park, California, United States",
    Specialties: [
      "Social Media",
      "Virtual Reality",
      "Augmented Reality",
      "Online Advertising",
      "Artificial Intelligence",
      "Metaverse Development",
      "Messaging Platforms",
      "Software Engineering"
    ]
  },
  Adobe: {
    Name: "Adobe",
    Overview: "Adobe is a global leader in digital media and digital marketing solutions. Best known for products like Photoshop, Acrobat, and Creative Cloud, Adobe empowers everyone—from emerging artists to global brands—to bring digital experiences to life.",
    Industry: "Software & Technology Services",
    Website: "https://www.adobe.com",
    Size: "30,000+ Employees",
    Headquarters: "San Jose, California, United States",
    Specialties: [
      "Digital Media",
      "Digital Marketing",
      "Creative Software",
      "Document Management",
      "Cloud Services",
      "Artificial Intelligence",
      "Design Tools",
      "Marketing Automation"
    ]
  },
  Facebook: {
    Name: "Facebook",
    Overview: "Facebook, part of Meta Platforms, is one of the world's largest social media platforms. It enables people to connect, share, and communicate with each other globally. Founded by Mark Zuckerberg in 2004, Facebook revolutionized social networking and continues to innovate with new features and technologies.",
    Industry: "Internet, Social Media & Technology",
    Website: "https://www.facebook.com",
    Size: "60,000+ Employees (as part of Meta)",
    Headquarters: "Menlo Park, California, United States",
    Specialties: [
      "Social Networking",
      "Online Communities",
      "Messaging",
      "Content Sharing",
      "Advertising",
      "Mobile Applications",
      "Artificial Intelligence",
      "Virtual Reality"
    ]
  },
  Netflix: {
    Name: "Netflix",
    Overview: "Netflix is the world’s leading streaming entertainment service with over 200 million paid memberships in over 190 countries. It offers TV series, documentaries, feature films, and mobile games across a wide variety of genres and languages. Netflix is committed to providing quality entertainment and innovative storytelling.",
    Industry: "Entertainment, Media & Technology",
    Website: "https://www.netflix.com",
    Size: "12,000+ Employees",
    Headquarters: "Los Gatos, California, United States",
    Specialties: [
      "Streaming Entertainment",
      "Content Production",
      "Original Programming",
      "Video on Demand",
      "Data Analytics",
      "Cloud Computing",
      "Global Distribution",
      "Film and TV Production"
    ]
  },
  Spotify: {
    Name: "Spotify",
    Overview: "Spotify is a digital music service that gives you access to millions of songs and podcasts from around the world. With a freemium model, Spotify allows users to listen to music for free with ads or subscribe to remove ads and enjoy premium features.",
    Industry: "Music Streaming, Media & Technology",
    Website: "https://www.spotify.com",
    Size: "6,500+ Employees",
    Headquarters: "Stockholm, Sweden",
    Specialties: [
      "Music Streaming",
      "Podcast Streaming",
      "Audio Content Distribution",
      "Freemium Business Model",
      "Personalized Playlists",
      "Music Discovery",
      "Data Analytics",
      "Artificial Intelligence"
    ]
  },

  Amazon: {
    Name: "Amazon",
    Overview: "Amazon is a multinational technology company focused on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is one of the largest online retailers in the world, with a diversified portfolio that includes Amazon Web Services (AWS), Alexa, and Amazon Prime.",
    Industry: "E-Commerce, Technology, Cloud Computing",
    Website: "https://www.amazon.com",
    Size: "1,600,000+ Employees",
    Headquarters: "Seattle, Washington, United States",
    Specialties: [
      "E-Commerce",
      "Cloud Computing",
      "Artificial Intelligence",
      "Digital Streaming",
      "Logistics & Supply Chain",
      "Retail",
      "Alexa",
      "Amazon Web Services (AWS)"
    ]
  },

  Microsoft: {
    Name: "Microsoft",
    Overview: "Microsoft is a global leader in software, hardware, and cloud computing. Known for products like Windows, Office, and Azure, Microsoft provides technology solutions for individuals, businesses, and governments worldwide. Its mission is to empower every person and organization on the planet to achieve more.",
    Industry: "Software, Technology, Cloud Computing",
    Website: "https://www.microsoft.com",
    Size: "221,000+ Employees",
    Headquarters: "Redmond, Washington, United States",
    Specialties: [
      "Software Development",
      "Cloud Computing",
      "Artificial Intelligence",
      "Enterprise Solutions",
      "Gaming (Xbox)",
      "Digital Services",
      "Cybersecurity",
      "Business Productivity Tools"
    ]
  },

  Apple: {
    Name: "Apple",
    Overview: "Apple is a leading global technology company known for its innovative consumer electronics, software, and digital services. With flagship products like the iPhone, iPad, Mac, and Apple Watch, Apple also operates a range of digital platforms including iCloud, iTunes, and the App Store.",
    Industry: "Consumer Electronics, Technology",
    Website: "https://www.apple.com",
    Size: "164,000+ Employees",
    Headquarters: "Cupertino, California, United States",
    Specialties: [
      "Consumer Electronics",
      "Smartphones",
      "Personal Computing",
      "Wearables",
      "Digital Services",
      "Software Development",
      "Augmented Reality",
      "Artificial Intelligence"
    ]
  },
  PaceUniversity: {
    Name: "Pace University",
    Overview: "Pace University is a comprehensive, independent university with campuses in New York City and Westchester County. Known for its strong focus on professional education combined with a solid liberal arts foundation, Pace offers a wide range of undergraduate, graduate, and professional degree programs across disciplines such as business, law, computer science, health professions, and the arts.",
    Industry: "Higher Education",
    Website: "https://www.pace.edu",
    Size: "13,000+ Students and Faculty",
    Headquarters: "New York City, New York, United States",
    Specialties: [
      "Higher Education",
      "Business Education",
      "Law and Public Policy",
      "Computer Science and Information Systems",
      "Health Professions",
      "Performing Arts",
      "Environmental Studies",
      "Research and Innovation"
    ]
  }
};

const similar=[
{
  name: "Meta",
 employees: 58604
},
{
  name: "Netflix",
 employees: 12800
},
{
  name: "Microsoft",
 employees: 221000
},
{
  name: "Adobe",
 employees: 29439
},
{
  name: "Google",
 employees: 181798
},
{
  name: "Spotify",
 employees: 8200
},
{
  name: "Amazon",
 employees: 1561000
},
{
  name: "Apple",
 employees: 164000
},
{
  name:"PaceUniversity",
  employees:1573
}
]

export {companyData, similar};  