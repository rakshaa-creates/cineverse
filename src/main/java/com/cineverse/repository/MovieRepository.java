package com.cineverse.repository;

import com.cineverse.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByCategory(String category);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
