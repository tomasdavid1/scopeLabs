### **📜 README.md – ScopeLabs Video Platform**  

# **🎓 ScopeLabs Video Platform**  
A simple **EdTech video platform** where users can:  
✅ **Upload new educational videos**  
✅ **Watch YouTube & MP4 videos**  
✅ **Comment on videos in real-time**  
✅ **Hosted live on [Vercel](https://scope-labs.vercel.app/)**  

---

## **🚀 Live Demo**  
🔗 **Vercel Deployment**: [Click here to view the app](https://scope-labs.vercel.app/)  

---

## **🛠️ Features**
- 🎥 **Upload & Watch Videos** – Supports **YouTube** (via embed) and **MP4 files**  
- 💬 **Comment System** – Users can add & view comments on videos  
- 📺 **Responsive Video Player** – Uses **iframes for YouTube** and **native video controls for MP4**  
- 🏗 **Built with Next.js & Tailwind CSS** – Fast, modern, and mobile-friendly  
- ☁ **Hosted on Vercel** – No setup required, just deploy instantly  

---

## **📌 How to Run Locally**
### **1️⃣ Clone the Repository**
```sh
git clone git@github.com:tomasdavid1/scopeLabs.git
cd scopeLabs
```

### **2️⃣ Install Dependencies**
```sh
npm install
```
(Or use `yarn install` if you prefer Yarn)

### **3️⃣ Set Up Environment Variables**

```
(Replace with your actual API URL)

### **4️⃣ Run the Development Server**
```sh
npm run dev
```
Your app will be available at:  
🔗 `http://localhost:3000`

---

## **📺 Video Support**
- **YouTube Videos** – Automatically embedded via iframe  
- **MP4 Videos** – Played using the native HTML `<video>` element  
- **Google Drive Videos** – Requires special embedding (see below)  

**How to Upload Google Drive Videos:**  
1. **Get the file ID** from the link:  
   ```
   https://drive.google.com/file/d/FILE_ID/view
   ```
2. **Use this format in the app**:  
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```

---

## **📂 Folder Structure**
```
scopeLabs/
│── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Next.js pages (index, upload, video details)
│   ├── styles/            # Tailwind global styles
│   ├── api/               # Backend API routes (Next.js server functions)
│── public/                # Static assets
│── .env.local             # Environment variables (API URLs)
│── README.md              # You're reading it now! 📜
│── next.config.js         # Next.js configuration
│── tailwind.config.js     # Tailwind CSS configuration
│── tsconfig.json          # TypeScript config
│── package.json           # Dependencies and scripts
```

---

## **🎥 Screenshots**
📌 **Main Page**
![Main Page Screenshot](https://your-image-url.com/main.png)

📌 **Video Player (YouTube)**
![YouTube Video Screenshot](https://your-image-url.com/youtube.png)

📌 **Comment Section**
![Comment Section Screenshot](https://your-image-url.com/comments.png)

---

## **🛠 Tech Stack**
| Technology | Purpose |
|------------|---------|
| **Next.js** | Frontend framework |
| **Tailwind CSS** | Styling |
| **React Hooks** | State management |
| **Vercel** | Hosting |
| **FastAPI** | Backend API |

---

## **🤝 Contributing**
Want to contribute? Follow these steps:
1. **Fork the repo**  
2. **Create a new branch**  
   ```sh
   git checkout -b feature-new-video-player
   ```
3. **Make your changes and commit**  
   ```sh
   git commit -m "Added support for XYZ"
   ```
4. **Push the branch and open a PR**  
   ```sh
   git push origin feature-new-video-player
   ```

---

---

## **📝 License**
This project is licensed under the **MIT License** – you're free to modify and use it as needed.

---

🚀 **Happy coding & enjoy the platform!** 🚀