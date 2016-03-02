package com.bobbysnehacorp.mymedia.repository;

import com.bobbysnehacorp.mymedia.domain.Video;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Video entity.
 */
public interface VideoRepository extends JpaRepository<Video,Long> {

    @Query("select video from Video video where video.user.login = ?#{principal.username}")
    List<Video> findByUserIsCurrentUser();

}
