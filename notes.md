BACKEND STRUCTURE/
├── controllers/             # Handles route logic
│   ├── auth.js              # Sign up / sign in
│   ├── users.js             # Profile, followers, quiz data
│   ├── outfits.js           # Clothing/outfits
│   ├── comments.js          # Commenting on outfits
│   ├── folders.js           # Folder CRUD
│   └── folderOutfits.js     # Add/remove outfits in folders
│
├── models/                  # Mongoose schemas
│   ├── User.js
│   ├── Outfit.js
│   ├── Comment.js
│   ├── Folder.js
│   └── FolderOutfits.js
│
├── routes/                  # Route entry points (Express routers)
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── outfitRoutes.js
│   ├── commentRoutes.js
│   ├── folderRoutes.js
│   └── folderOutfitRoutes.js
│
├── middleware/              # Reusable middleware
│   ├── verifyToken.js       # JWT authentication
│   └── errorHandler.js      # Optional: central error handler
│
├── config/
│   └── db.js                # Mongoose connection setup
│
├── .env                     # Secrets (DB URI, JWT secret)
├── server.js                # App entry point
├── package.json
└── README.md