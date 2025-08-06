# AI Email Sender Frontend

A modern, responsive React.js application for AI-powered email generation and sending.

## Features

- 🤖 **AI Email Generation** - Generate professional emails using OpenAI GPT
- ✏️ **Email Editing** - Edit generated emails with a rich interface
- 📧 **Recipient Management** - Add, validate, and manage email recipients
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔔 **Smart Notifications** - Real-time feedback with toast notifications
- ⚡ **Fast Performance** - Optimized React components with efficient state management
- 🔧 **Service Status** - Monitor backend service health and configuration

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **PostCSS & Autoprefixer** - CSS processing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd Email-Sender-FE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Environment Variables (Optional)

Create a `.env` file in the frontend root if you need to customize the API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Custom button component
│   ├── Input.jsx       # Form input component
│   ├── Textarea.jsx    # Textarea component
│   ├── Select.jsx      # Select dropdown component
│   ├── Card.jsx        # Card container component
│   ├── LoadingSpinner.jsx
│   ├── StatusIndicator.jsx
│   ├── EmailGenerator.jsx
│   ├── EmailPreview.jsx
│   ├── RecipientManager.jsx
│   └── ServiceStatus.jsx
├── services/           # API service layer
│   └── apiService.js   # Axios-based API client
├── utils/              # Utility functions
│   └── validation.js   # Form validation helpers
├── App.jsx            # Main application component
├── index.js           # Application entry point
└── index.css          # Global styles with Tailwind
```

## Key Components

### EmailGenerator
- Handles AI prompt input and email generation
- Supports multiple tones (professional, casual, formal, friendly)
- Multiple email types (business, marketing, follow-up, etc.)
- Real-time validation and helpful tips

### EmailPreview
- Displays generated emails with formatting
- Inline editing capabilities
- Copy to clipboard functionality
- Send email integration

### RecipientManager
- Add and validate email addresses
- Bulk email input (comma, semicolon, or newline separated)
- Real-time email validation
- Remove individual recipients

### ServiceStatus
- Monitor backend service health
- Check AI service configuration
- Email service status
- Configuration guidance

## Features in Detail

### AI Email Generation
- **Smart Prompts**: Provide context and get professional emails
- **Multiple Tones**: Choose from professional, casual, formal, or friendly
- **Email Types**: Business, marketing, follow-up, invitation, and general
- **Context Awareness**: AI considers recipients and email type

### Email Editing
- **Inline Editing**: Edit subject and body directly in the preview
- **Real-time Updates**: Changes are reflected immediately
- **Validation**: Ensures required fields are filled
- **Copy Function**: One-click copy to clipboard

### Recipient Management
- **Bulk Input**: Paste multiple emails at once
- **Smart Validation**: Real-time email format validation
- **Duplicate Prevention**: Automatically filters duplicate emails
- **Visual Feedback**: Clear success and error indicators

### User Experience
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Clear feedback during API calls
- **Error Handling**: Helpful error messages and recovery suggestions
- **Toast Notifications**: Non-intrusive success and error messages

## Customization

### Styling
The app uses Tailwind CSS with a custom configuration. You can modify:
- `tailwind.config.js` - Theme colors, animations, and utilities
- `src/index.css` - Global styles and custom components

### API Configuration
- `src/services/apiService.js` - API endpoints and request handling
- Environment variables for different backend URLs

### Components
All components are modular and reusable. Key props and customization options are documented in each component file.

## Backend Integration

The frontend communicates with the backend through a REST API:

- `POST /api/email/generate` - Generate emails with AI
- `POST /api/email/send` - Send emails to recipients
- `POST /api/email/validate` - Validate email addresses
- `GET /api/email/status` - Get service status
- `GET /api/health` - Health check

## Performance Optimizations

- **Component Optimization**: Efficient re-rendering with proper key usage
- **API Caching**: Smart caching of API responses
- **Bundle Optimization**: Tree-shaking and code splitting
- **Image Optimization**: Optimized assets and lazy loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints

2. **Email Generation Fails**
   - Check OpenAI API key configuration
   - Verify internet connection
   - Check API quota limits

3. **Email Sending Issues**
   - Verify SMTP configuration in backend
   - Check email credentials
   - Ensure recipients are valid

## License

This project is licensed under the MIT License.