package com.cineverse.config;

import com.cineverse.model.Movie;
import com.cineverse.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        Movie.builder()
                                .title("Inception")
                                .genre("Sci-Fi")
                                .description("A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.")
                                .releaseYear(2010)
                                .rating(8.8)
                                .posterURL("https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg")
                                .trailerURL("https://www.youtube.com/embed/YoHD9XEInc0")
                                .category("Trending Now")
                                .director("Christopher Nolan")
                                .castMembers("Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page")
                                .build(),
                        Movie.builder()
                                .title("Spider-Man: Into the Spider-Verse")
                                .genre("Animation")
                                .description("Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.")
                                .releaseYear(2018)
                                .rating(8.4)
                                .posterURL("https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg")
                                .trailerURL("https://www.youtube.com/embed/tg52up16eq0")
                                .category("Top Animation Movies")
                                .director("Bob Persichetti, Peter Ramsey, Rodney Rothman")
                                .castMembers("Shameik Moore, Jake Johnson, Hailee Steinfeld")
                                .build(),
                        Movie.builder()
                                .title("Interstellar")
                                .genre("Sci-Fi")
                                .description("A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.")
                                .releaseYear(2014)
                                .rating(8.7)
                                .posterURL("https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg")
                                .trailerURL("https://www.youtube.com/embed/zSWdZVtXT7E")
                                .category("VFX Masterpieces")
                                .director("Christopher Nolan")
                                .castMembers("Matthew McConaughey, Anne Hathaway, Jessica Chastain")
                                .build(),
                        Movie.builder()
                                .title("Avatar")
                                .genre("Action")
                                .description("A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.")
                                .releaseYear(2009)
                                .rating(7.9)
                                .posterURL("https://image.tmdb.org/t/p/w500/kyeqWdyAItOUgq4d7A18wunB2w.jpg")
                                .trailerURL("https://www.youtube.com/embed/5PSNL1qE6VY")
                                .category("VFX Masterpieces")
                                .director("James Cameron")
                                .castMembers("Sam Worthington, Zoe Saldana, Sigourney Weaver")
                                .build(),
                        Movie.builder()
                                .title("The Matrix")
                                .genre("Sci-Fi")
                                .description("When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.")
                                .releaseYear(1999)
                                .rating(8.7)
                                .posterURL("https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg")
                                .trailerURL("https://www.youtube.com/embed/vKQi3bBA1y8")
                                .category("Classic Cinema")
                                .director("Lana Wachowski, Lilly Wachowski")
                                .castMembers("Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss")
                                .build(),
                        Movie.builder()
                                .title("Spirited Away")
                                .genre("Animation")
                                .description("During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.")
                                .releaseYear(2001)
                                .rating(8.6)
                                .posterURL("https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkHmI5tPu.jpg")
                                .trailerURL("https://www.youtube.com/embed/ByXuk9QqQkk")
                                .category("Top Animation Movies")
                                .director("Hayao Miyazaki")
                                .castMembers("Rumi Hiiragi, Miyu Irino, Mari Natsuki")
                                .build()
                ));
            }
        };
    }
}
