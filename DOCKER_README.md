# Docker Setup for Interview Tracker

## Quick Start

### Build and Run with Docker Compose (Recommended)

```bash
docker-compose up --build
```

האפליקציה תהיה זמינה ב: `http://localhost:8081`

### Build Docker Image Manually

```bash
# Build the image
docker build -t interview-tracker .

# Run the container
docker run -p 8081:8081 interview-tracker
```

### Stop the Container

```bash
docker-compose down
```

או:

```bash
docker stop interview-tracker
```

## פירוט הקבצים

- **Dockerfile** - הגדרת ה-Docker image
- **docker-compose.yml** - הגדרת ה-container עם כל ההגדרות
- **.dockerignore** - קבצים שלא יועתקו ל-image

## הערות

- האפליקציה רצה על פורט 8081
- הנתונים נשמרים ב-localStorage (בדפדפן) או AsyncStorage (במובייל)
- התמונה ברקע נטענת מהתיקייה `assets/`

## Troubleshooting

אם יש בעיות:

1. **נקה את ה-cache:**
   ```bash
   docker-compose down
   docker system prune -a
   docker-compose up --build
   ```

2. **בדוק את הלוגים:**
   ```bash
   docker-compose logs -f
   ```

3. **הרץ מחדש:**
   ```bash
   docker-compose restart
   ```

