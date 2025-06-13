# React Todo Application

A modern, accessible Todo application built with React and Material-UI, featuring real-time search, filtering, and offline support.

## Features

- ✨ Modern UI with Material-UI components
- 🔍 Real-time search and filtering
- 📱 Responsive design
- ♿ Accessibility features
- 🔄 Offline support with localStorage
- 🎨 Custom theme support
- 📝 CRUD operations for todos
- 🏷️ Status tracking (Complete/Pending)

## Tech Stack

- React 19
- Material-UI (MUI) v7
- Tailwind v4
- React Router v7
- Tanstack Query v5 / Axios v1
- Vite
- ESLint
- pnpm

## Project Structure

```
my-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── assets/        # Static assets
│   ├── App.jsx        # Root component
│   ├── main.jsx       # Entry point
│   └── theme.js       # MUI theme configuration
├── public/            # Static files
└── vite.config.js     # Vite configuration
```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `pnpm run dev` - Runs the app in development mode
- `pnpm run build` - Builds the app for production (creates a `dist` directory)
- `pnpm run preview` - Previews the production build (must run `build` first)
- `pnpm run lint` - Runs ESLint

## Development

### Prerequisites

- Node.js (v18 )
- pnpm (v8)

### Environment Setup

1. Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

2. Install project dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

### Production Build

To create a production build and preview it:

1. Build the project:

```bash
pnpm run build
```

2. Preview the production build:

```bash
pnpm run preview
```

The preview will be available at `http://localhost:4173`.

## Features in Detail

### Todo Management

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Real-time search functionality
- Filter todos by status (All/Active/Completed)

### UI/UX

- Responsive design for all screen sizes
- Material-UI components for consistent look and feel
- Smooth transitions
- Intuitive user interface

### Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader compatibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Material-UI for the component library
- Vite for the build tooling
- React Router for navigation
- Tanstack Query for data management

## API Documentation

### Base URL

```
https://dummyjson.com/todos
```

### Authentication

This API is public and does not require authentication.

### Data Persistence

- Data is persisted in localStorage for offline support
- Changes are synced with the API when online

## Known Issues and Limitations

### Current Limitations

- Limited to single user operations
- No due dates or reminders
- Offline mode has limited functionality for complex operations

### Technical Limitations

- No server-side validation
- No user authentication

### Planned Features

- [ ] User authentication and authorization
- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] Dark mode support

### Technical Improvements

- [ ] Implement proper error boundaries
- [ ] Implement proper data validation
- [ ] Implement proper state management
- [ ] Add proper documentation

### Performance Improvements

- [ ] Add proper lazy loading
- [ ] Optimize bundle size
- [ ] Implement proper error tracking

### UI/UX Improvements

- [ ] Improve overall design

## License

This project is licensed under the MIT License.
