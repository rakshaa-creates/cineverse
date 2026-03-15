# CineVerse - Movies, Animations & VFX Collection

CineVerse is a Netflix-inspired movie browsing platform built as a **Java full-stack case study project**. It features a modern, dark-themed UI, an H2 in-memory database, RESTful APIs, and a fun interactive "Anti-Gravity" easter egg.

## Features

- **Netflix-Style UI**: Dark theme, hero banner, horizontal scrolling movie rows, hover animations.
- **RESTful API**: Full CRUD capabilities using Spring Boot Data JPA.
- **In-Memory Database**: Uses H2 database for zero-config setup, auto-populated with sample movies.
- **Anti-Gravity Mode**: An interactive physics simulation (using `Matter.js`) that causes UI elements to drop, collide, and become draggable!
- **Admin Panel**: A simple interface to Add, Edit, and Delete movies.
- **Search & Filter**: Find movies by title or filter them by genre.

## Tech Stack

- **Backend**: Java 17, Spring Boot (Web, Data JPA), H2 Database, Lombok.
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5, jQuery.
- **Physics Engine**: Matter.js (A modern alternative to Gravity.js).

## How to Run Locally

### Prerequisites
- JDK 17+
- Maven

### Steps
1. Navigate to the project root directory where `pom.xml` is located.
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
3. The server will start on port 8080.
4. Open your web browser and go to:
   [http://localhost:8080](http://localhost:8080)
5. To view the H2 Database console, go to:
   [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
   - **JDBC URL**: `jdbc:h2:mem:cineversedb`
   - **Username**: `sa`
   - **Password**: *(leave blank)*

## Case Study Highlights
- **Clean Architecture**: Follows `Controller` -> `Service` -> `Repository` pattern.
- **Modular Frontend**: Separate HTML pages with centralized CSS and JS logic.
- **Bonus Interaction**: The Anti-Gravity feature maps DOM elements to rigid physics bodies demonstrating advanced DOM manipulation combined with Canvas-based 2D physics rendering.
