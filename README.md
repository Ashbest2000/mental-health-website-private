# Mental Health Platform

A comprehensive web application designed to provide accessible mental health support for residents of Dhaka, Bangladesh. This platform offers AI-powered assessments, 24/7 chat support, private journaling, volunteer connections, and a directory of mental health institutions.

## Project Information

**Student Name:** Aiman Saad Hamid  
**Student ID:** 2131225  
**Course:** CSE309 Section 01  
**Submitted to:** Md. Abu Syed  
**SOD:** Rabiul Hasan

## Overview

This mental health platform is built to make mental health support accessible to everyone in Bangladesh, regardless of their financial situation. The platform provides free core services including AI-powered mental health assessments, 24/7 AI chatbot support with crisis detection, private journaling for mental health tracking, connections to trained volunteers, and a comprehensive directory of mental health institutions in Dhaka.

## Features

### User Features

**Mental Health Assessments**
- Depression Screening (PHQ-9): 9-question validated tool for screening depression severity
- Anxiety Screening (GAD-7): 7-question reliable tool for assessing anxiety symptoms
- ADHD Screening (ASRS-6): 6-question scale for screening attention-deficit/hyperactivity disorder
- Autism Spectrum Screening (AQ-10): 10-question tool to identify traits associated with autism spectrum
- OCD Screening (FOCI): 10-question inventory for screening OCD symptoms and compulsive behaviors
- PTSD Screening (PCL-5): 10-question checklist for screening post-traumatic stress disorder symptoms
- Psychotic Symptoms Screening: 10-question screening for potential psychotic symptoms

All assessments are confidential, encrypted, and stored securely. Results are only accessible to the user who took the assessment.

**AI Chat Support**
- 24/7 availability for users seeking immediate support
- Compassionate AI chatbot that listens and provides coping strategies
- Crisis detection capabilities to identify high-risk situations
- Conversation history saved for logged-in users
- Anonymous chat available for non-registered users

**Private Journal**
- Secure, private journal entries for expressing thoughts and feelings
- Mood tracking with options: great, good, okay, bad, terrible
- Timestamp tracking for all entries
- Edit and delete functionality for journal entries
- Helps users understand themselves better and track their mental health journey

**Institution Directory**
- Comprehensive directory of mental health facilities in Dhaka
- Filter by institution type: hospitals, clinics, counseling centers, hotlines
- Filter by area/location
- Filter by emergency availability
- Detailed information including address, phone, email, website, operating hours, and services

**Volunteer System**
- Users can sign up to become volunteers
- Volunteers can respond to crisis alerts detected by the AI chat system
- Volunteer dashboard for managing alerts
- Admin approval system for volunteer applications
- Training resources and guidelines provided

**User Dashboard**
- Personalized dashboard showing recent assessments
- Journal entry statistics
- Quick access to all platform features
- Crisis helpline information prominently displayed

### Admin Features

**Admin Dashboard**
- Overview statistics: total users, active volunteers, recent crisis alerts, content items
- User management: view and manage all platform users
- Volunteer management: approve and manage volunteer applications
- Crisis alerts monitoring: view and respond to high-risk alerts detected by the system
- Institution management: add, edit, and manage mental health facilities
- Content management: create and edit articles and resources
- Payment tracking: view subscription and payment data

**Admin Roles**
- Role-based access control with different permission levels
- Audit logging for administrative actions
- Secure admin authentication

## Technology Stack

**Frontend**
- Next.js 16.1.0 (React framework)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4.1.9
- Radix UI components for accessible UI elements
- Lucide React for icons

**Backend**
- Next.js API routes
- Supabase for database and authentication
- Server-side rendering with Next.js App Router

**AI Integration**
- Google Generative AI SDK
- AI SDK for React
- Crisis detection algorithms

**Database**
- Supabase PostgreSQL database
- Row Level Security (RLS) policies for data protection
- Automatic user profile creation

**Deployment**
- Vercel for hosting and deployment
- Environment variables for configuration

## Installation Guide

### Prerequisites

- Node.js 18 or higher
- pnpm package manager (or npm/yarn)
- Supabase account and project
- Google Generative AI API key (for AI chat functionality)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd mental-health-website-private
```

### Step 2: Install Dependencies

```bash
pnpm install
```

If you don't have pnpm installed, you can install it with:
```bash
npm install -g pnpm
```

Alternatively, use npm:
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

**Getting Supabase Credentials:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret)

**Getting Google AI API Key:**
1. Go to Google AI Studio (https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your environment variables

### Step 4: Set Up Database

Run the SQL migration scripts in order:

1. Navigate to the `supabase/migrations` directory
2. Run the migrations in your Supabase SQL editor:
   - `001_mental_health_platform_schema.sql`
   - `002_admin_roles_audit_subscriptions_content.sql`
   - `003_fix_rls_and_auto_profile.sql`
   - `004_fix_admin_roles_rls.sql`
   - `005_disable_admin_roles_rls.sql`
   - `006_auto_create_user_profile.sql`

Alternatively, you can run the scripts from the `scripts` directory in order:
- `001_create_tables.sql`
- `002_seed_data.sql`
- `003_add_admin_roles.sql`
- `005_seed_resources.sql`
- `006_create_admin_account.sql`

### Step 5: Run Development Server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 6: Build for Production

```bash
pnpm build
pnpm start
```

## Usage Guide

### For Regular Users

**Creating an Account**
1. Navigate to the signup page
2. Enter your email and password
3. Complete your profile with your full name
4. You will be automatically logged in after signup

**Taking an Assessment**
1. Log in to your account
2. Navigate to the Assessments page from the dashboard or navigation menu
3. Select the assessment you want to take (Depression, Anxiety, ADHD, etc.)
4. Answer all questions honestly
5. Review your results and severity score
6. Results are saved to your account for future reference

**Using the AI Chat**
1. Navigate to the Chat page
2. Start typing your message in the chat interface
3. The AI will respond with supportive messages and coping strategies
4. If you're logged in, your conversation history will be saved
5. The system automatically detects crisis situations and can alert volunteers

**Writing Journal Entries**
1. Navigate to the Journal page
2. Click "New Entry" button
3. Enter a title for your entry
4. Write your thoughts and feelings
5. Select your current mood
6. Save the entry
7. You can edit or delete entries later from the journal list

**Finding Mental Health Institutions**
1. Navigate to the Institutions page
2. Use filters to find institutions by type, area, or emergency availability
3. Click on an institution card to view detailed information
4. Contact information is provided for each institution

**Becoming a Volunteer**
1. Log in to your account
2. Navigate to the Volunteer page
3. Read the requirements and benefits
4. Click "Sign Up as Volunteer"
5. Complete the volunteer application form
6. Wait for admin approval
7. Once approved, access the volunteer dashboard to respond to crisis alerts

### For Administrators

**Accessing Admin Dashboard**
1. Log in with an account that has admin privileges
2. Navigate to the Admin Dashboard from the navigation menu or dashboard
3. View platform statistics and manage various aspects of the platform

**Managing Users**
1. Go to Admin Dashboard > User Management
2. View all registered users
3. View user profiles and activity

**Managing Volunteers**
1. Go to Admin Dashboard > Volunteer Management
2. View pending volunteer applications
3. Approve or reject volunteer applications
4. View active volunteers

**Monitoring Crisis Alerts**
1. Go to Admin Dashboard > Crisis Alerts
2. View all alerts detected by the AI chat system
3. See alert details including user information and conversation context
4. Track alert resolution status

**Managing Institutions**
1. Go to Admin Dashboard > Institutions
2. Add new mental health institutions
3. Edit existing institution information
4. Remove outdated institutions

**Content Management**
1. Go to Admin Dashboard > Content Management
2. Create new articles and resources
3. Edit existing content
4. Manage content visibility

## Project Structure

```
mental-health-website-private/
├── app/                          # Next.js app directory
│   ├── actions/                  # Server actions
│   │   ├── admin.ts
│   │   ├── assessments.ts
│   │   ├── chat.ts
│   │   ├── journal.ts
│   │   └── volunteer.ts
│   ├── admin/                    # Admin pages
│   │   ├── alerts/
│   │   ├── content/
│   │   ├── institutions/
│   │   ├── payments/
│   │   ├── setup/
│   │   ├── users/
│   │   └── volunteers/
│   ├── api/                      # API routes
│   │   └── chat/
│   ├── assessments/              # Assessment pages
│   │   ├── adhd/
│   │   ├── anxiety/
│   │   ├── autism/
│   │   ├── depression/
│   │   ├── ocd/
│   │   ├── ptsd/
│   │   ├── schizophrenia/
│   │   └── results/
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   ├── logout/
│   │   └── signup/
│   ├── chat/                     # Chat interface
│   ├── dashboard/                # User dashboard
│   ├── institutions/            # Institution directory
│   ├── journal/                  # Journal pages
│   ├── resources/                # Resources page
│   ├── support/                  # Support page
│   └── volunteer/                # Volunteer pages
├── components/                   # React components
│   ├── ui/                       # UI component library
│   └── [component files]
├── lib/                          # Utility libraries
│   ├── auth-helpers.ts
│   ├── check-admin.ts
│   ├── supabase/                 # Supabase client utilities
│   └── utils.ts
├── public/                       # Static assets
├── scripts/                      # Database scripts
├── supabase/                     # Supabase migrations
│   └── migrations/
├── styles/                       # Global styles
├── middleware.ts                 # Next.js middleware
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Database Schema

The platform uses the following main tables:

- `user_profiles`: User profile information
- `diagnostic_results`: Assessment results
- `journal_entries`: User journal entries
- `crisis_alerts`: Alerts detected by AI chat
- `volunteers`: Volunteer information and status
- `institutions`: Mental health institution directory
- `admin_roles`: Admin role assignments
- `content`: Platform content and articles
- `chat_messages`: Chat conversation history

## Security Features

- Row Level Security (RLS) policies on all database tables
- Secure authentication via Supabase Auth
- Encrypted data storage
- Admin role-based access control
- Protected API routes
- Environment variable protection for sensitive keys

## Crisis Support Information

If you or someone you know is in immediate crisis:

- Emergency Services: 999
- Kaan Pete Roi Crisis Hotline: +880-2-5853305 (24/7)
- Moner Bondhu: +880-1779-554391

The platform's AI chat system automatically detects crisis situations and can connect users with volunteers or emergency services when needed.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

The `vercel.json` file contains deployment configuration.

## Contributing

This is a course project for CSE309. For questions or issues, please contact the course instructor.

## License

This project is developed for educational purposes as part of CSE309 coursework.

## Acknowledgments

- Built with Next.js and Supabase
- UI components from Radix UI
- Icons from Lucide React
- AI capabilities powered by Google Generative AI
