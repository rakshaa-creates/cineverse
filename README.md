# 🎬 CineVerse 

**CineVerse** is a modern, Netflix-inspired movie collection and browsing platform. Built as a full-stack Java case study project, it features a sleek dark-themed UI, an in-memory SQL database for zero-configuration testing, and a fully functional REST API architecture.

As a unique easter egg, CineVerse incorporates an interactive **Anti-Gravity Mode** powered by a 2D physics engine, allowing users to watch the UI elements detach and fall to the bottom of the screen!

---

## 📽️ Features

- **Netflix-Style UI**: A premium dark theme, large hero banners, horizontal scrolling movie rows, and smooth hover micro-animations.
- **RESTful API Architecture**: Complete backend API to `GET`, `POST`, `PUT`, and `DELETE` movies.
- **Dynamic Content Filtering**: Seamlessly filter movies by category or genre without refreshing the page.
- **Admin Panel**: A centralized dashboard to add new titles, edit existing movie details, and manage the catalog.
- **Bonus Interaction (Anti-Gravity)**: Toggle the gravity mode to turn the DOM elements into rigid physics bodies. Watch them fall, bounce, and drag them around using `Matter.js`.
- **Zero Configuration DB**: Utilizes Spring Boot with an H2 in-memory database that auto-populates on application startup.

---

## 📸 Screenshots

*(Add your screenshots here!)*

* ### Home Page (Hero Banner & Categories)
  ![Home Page Screenshot](#) <!-- Replace # with actual image path/URL -->

* ### Movies Grid & Filtering
  ![Movies Grid Screenshot](#) <!-- Replace # with actual image path/URL -->

* ### Movie Details (With Trailer)
  ![Movie Details Screenshot](#) <!-- Replace # with actual image path/URL -->

* ### Admin Panel
  ![Admin Panel Screenshot](#) <!-- Replace # with actual image path/URL -->

---

## 💻 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
  - Spring Web (REST APIs)
  - Spring Data JPA (Hibernate)
- **H2 Database** (In-memory structured data storage)

### Frontend
- **HTML5 & CSS3** (Custom Netflix-style design system)
- **Bootstrap 5** (Responsive grid grid layout and modals)
- **JavaScript (Vanilla + jQuery)** (DOM manipulation and AJAX API requests)
- **Matter.js** (2D Web Physics Engine for Anti-Gravity mode)

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have installed on your system:
- **Java JDK 17** or higher
- **Maven** (`mvn`)

### Installation & Execution Steps

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd cineverse
   ```

2. **Run the Spring Boot Application** using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *(Note: The first run might take a minute as Maven downloads the required Spring Boot dependencies).*

3. **Open the Application**:
   Once the server starts, open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

4. **Explore the H2 Database Console (Optional)**:
   You can view and query the in-memory database directly:
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:cineversedb`
   - Username: `sa`
   - Password: *(leave blank)*

---

## 🏗️ Project Architecture

CineVerse follows the standard N-Tier architecture pattern:
- **Controllers** (`MovieController`): Manages HTTP requests and routes them to the service layer.
- **Services** (`MovieService`): Contains the business logic.
- **Repositories** (`MovieRepository`): Interfaces with the Spring Data JPA layer for database persistence.
- **Models** (`Movie`): Defines the Java Entity schema spanning properties like title, rating, poster URLs, and cast members.

---

*Built with ❤️ as a Full-Stack Java Case Study.*
