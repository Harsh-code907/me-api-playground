# Database Schema

## Profile Collection
- `_id`: ObjectId (auto-generated)
- `name`: String (required) - Full name
- `email`: String (required) - Email address
- `education`: String (required) - Educational background
- `work`: String (required) - Current work/position
- `links`: Object
  - `github`: String - GitHub profile URL
  - `linkedin`: String - LinkedIn profile URL
  - `portfolio`: String - Portfolio website URL
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Skill Collection
- `_id`: ObjectId (auto-generated)
- `name`: String (required) - Skill name
- `level`: Number (required, 1-10) - Proficiency level
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Project Collection
- `_id`: ObjectId (auto-generated)
- `title`: String (required) - Project title
- `description`: String (required) - Project description
- `skills`: Array of Strings (required) - Technologies used
- `links`: Object
  - `github`: String - GitHub repository URL
  - `demo`: String - Live demo URL
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)