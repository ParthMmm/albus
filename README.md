# Albus

Find and listen to more albums you'll love, and keep track of albums you want to listen to.

## How I worked on this project

- I used feature branches and Pull Requests: [https://github.com/ParthMmm/albus/pull/23]
- I used Notion to track my tasks :[https://parthm.notion.site/c37b6529f9194dff8ada16e7a7a04158?v=140530fa9d1e41c08fd02b4dfc7c01a8]

## How to navigate this project

- State with React Context: [https://github.com/ParthMmm/albus/tree/main/providers]
- Next.js pages for routing: [https://github.com/ParthMmm/albus/tree/main/pages]
- All the application's components: [https://github.com/ParthMmm/albus/tree/main/components]
- Node.js & Express backend: [https://github.com/ParthMmm/albus-backend]

## Why I built the project this way

- I decided to use React Context instead of Redux just so I could learn Context. It turned out well for some state management. I ended replacing a lot of function with React-Query at a later time after I learned about it. React-Query helped to improve state and data fetching.
- I've been trying out different React UI libraries and have come to really enjoy Chakra UI. I found I had the styling of Tailwind CSS while also being able to use Chakra's components.
- I built the backend with Node.js and Express as it was easy to continue using JavaScript and it handled everything I needed. I used MongoDB for a NoSQL database. As I was building, I was often changing my schema so a non-relational database was the best choice at the time. Now, after the schema is set I think a SQL database would be a better choice.
- I deployed the frontend with Vercel since I find its the simplest way with Next.js.
- I wanted to learn Docker and AWS so the backend is a docker container on ECS running with a EC2 instance. There is a CLB in front of the EC2 instance that gets routed to with Router 53.

## What I want to change

- Add tests

## Features

- User registration
- Album search
- Log albums
- Profiles
- Reviews
- Dark mode compatibility
- Responsive design

## Built With

- React
- React-Query
- Next.js
- Chakra UI
- MongoDB
- Express
- Node.js

## License

[MIT](https://github.com/ParthMmm/albus/blob/main/LICENSE)
