package com.cineverse.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;

    @Column(length = 1000)
    private String description;

    private Integer releaseYear;
    private Double rating;
    private String posterURL;
    private String trailerURL;
    private String category;
    private String director;
    private String castMembers;

    public Movie() {}

    public Movie(Long id, String title, String genre, String description, Integer releaseYear, Double rating, String posterURL, String trailerURL, String category, String director, String castMembers) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.posterURL = posterURL;
        this.trailerURL = trailerURL;
        this.category = category;
        this.director = director;
        this.castMembers = castMembers;
    }

    public static MovieBuilder builder() {
        return new MovieBuilder();
    }

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getReleaseYear() { return releaseYear; }
    public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getPosterURL() { return posterURL; }
    public void setPosterURL(String posterURL) { this.posterURL = posterURL; }

    public String getTrailerURL() { return trailerURL; }
    public void setTrailerURL(String trailerURL) { this.trailerURL = trailerURL; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public String getCastMembers() { return castMembers; }
    public void setCastMembers(String castMembers) { this.castMembers = castMembers; }

    public static class MovieBuilder {
        private Long id;
        private String title;
        private String genre;
        private String description;
        private Integer releaseYear;
        private Double rating;
        private String posterURL;
        private String trailerURL;
        private String category;
        private String director;
        private String castMembers;

        MovieBuilder() {}

        public MovieBuilder id(Long id) { this.id = id; return this; }
        public MovieBuilder title(String title) { this.title = title; return this; }
        public MovieBuilder genre(String genre) { this.genre = genre; return this; }
        public MovieBuilder description(String description) { this.description = description; return this; }
        public MovieBuilder releaseYear(Integer releaseYear) { this.releaseYear = releaseYear; return this; }
        public MovieBuilder rating(Double rating) { this.rating = rating; return this; }
        public MovieBuilder posterURL(String posterURL) { this.posterURL = posterURL; return this; }
        public MovieBuilder trailerURL(String trailerURL) { this.trailerURL = trailerURL; return this; }
        public MovieBuilder category(String category) { this.category = category; return this; }
        public MovieBuilder director(String director) { this.director = director; return this; }
        public MovieBuilder castMembers(String castMembers) { this.castMembers = castMembers; return this; }

        public Movie build() {
            return new Movie(id, title, genre, description, releaseYear, rating, posterURL, trailerURL, category, director, castMembers);
        }
    }
}
