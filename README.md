# 🏴‍☠️ Treasure Hunt Login System

A stunning Next.js web application for managing treasure hunt events with real-time login tracking and admin dashboard.

## 🌟 Features

- **Beautiful Login Interface**: Animated gradient backgrounds with treasure hunt theme
- **Dual Login System**: Separate credentials for freshers and admins
- **Real-time IST Time Display**: Shows current Indian Standard Time
- **Admin Dashboard**: Live monitoring of all login attempts
- **Firebase Integration**: Real-time database for storing login entries
- **Responsive Design**: Works perfectly on all devices
- **Winner Detection**: First fresher to login is declared the winner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account
- VS Code (recommended)

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Create a collection called `loginEntries`
5. Copy your Firebase configuration

### 2. Configuration

1. Open `src/lib/firebase.ts`
2. Replace the placeholder config with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Login Credentials

### For Freshers (Students)
- **Username**: `esportz@ismp`
- **Password**: `iitropargoat`
- **Additional**: Team Captain Entry Number (required)

### For Admin
- **Username**: `max1112`
- **Password**: `moelester`

## 📱 Pages

### 1. Login Page (`/`)
- Beautiful animated login form
- Validates credentials
- Shows team captain entry field for freshers
- Redirects to appropriate page after login

### 2. Success Page (`/success`)
- Congratulatory message for freshers
- Shows login timestamp in IST
- Achievement badge
- Instructions for next steps

### 3. Admin Dashboard (`/admin`)
- Real-time statistics
- Complete login history
- IST time display
- Winner identification (first fresher login)
- Refresh functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Ready for Vercel/Netlify

## 🎯 Event Flow

1. **Event Setup**: Admin sets up the treasure hunt clues
2. **Final Clue**: Teams receive the website URL as the final clue
3. **Login Race**: First team to login wins
4. **Real-time Tracking**: Admin monitors all attempts
5. **Winner Declaration**: System identifies and highlights the winner

## 🔧 Customization

### Change Login Credentials

Edit `src/utils/auth.ts`:

```typescript
export const USERS: User[] = [
  {
    username: 'your-fresher-username',
    password: 'your-fresher-password',
    type: 'fresher'
  },
  {
    username: 'your-admin-username',
    password: 'your-admin-password',
    type: 'admin'
  }
];
```

### Modify UI Colors

The application uses a treasure hunt theme with:
- Purple/Blue gradients for backgrounds
- Yellow/Orange for call-to-action elements
- Green for success states
- Red for admin/error states

Edit Tailwind classes in components to customize colors.

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add Firebase environment variables
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `out` directory to your hosting provider

## 🔒 Security Considerations

- Credentials are hardcoded for event simplicity
- For production use, implement proper authentication
- Add rate limiting for login attempts
- Use environment variables for sensitive data

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify Firebase configuration
- Check network connectivity
- Ensure Firestore rules allow read/write

### Login Not Working
- Check credentials exactly as specified
- Verify team captain entry for freshers
- Check browser console for errors

### Time Display Issues
- Verify timezone settings
- Check for JavaScript date/time API support

## 📞 Support

For technical issues during the event:
1. Check browser console for errors
2. Verify internet connection
3. Try refreshing the page
4. Contact event administrators

## 🎉 Event Success Tips

1. **Test Before Event**: Verify all functionality
2. **Share URL**: Distribute the website link as final clue
3. **Monitor Dashboard**: Keep admin page open during event
4. **Backup Plan**: Have alternative verification method ready

---

🏆 **Good luck to all treasure hunters!** 🏆

Made with ❤️ for an amazing treasure hunt experience!
