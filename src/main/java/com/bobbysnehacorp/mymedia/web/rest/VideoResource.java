package com.bobbysnehacorp.mymedia.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bobbysnehacorp.mymedia.domain.Video;
import com.bobbysnehacorp.mymedia.repository.UserRepository;
import com.bobbysnehacorp.mymedia.repository.VideoRepository;
import com.bobbysnehacorp.mymedia.repository.search.VideoSearchRepository;
import com.bobbysnehacorp.mymedia.security.SecurityUtils;
import com.bobbysnehacorp.mymedia.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Video.
 */
@RestController
@RequestMapping("/api")
public class VideoResource {

    private final Logger log = LoggerFactory.getLogger(VideoResource.class);
        
    @Inject
    private VideoRepository videoRepository;
    
    @Inject
    private VideoSearchRepository videoSearchRepository;
    
    @Inject
    private UserRepository userRepository;
    
    /**
     * POST  /videos -> Create a new video.
     */
    @RequestMapping(value = "/videos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Video> createVideo(@Valid @RequestBody Video video) throws URISyntaxException {
        log.debug("REST request to save Video : {}", video);
        if (video.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("video", "idexists", "A new video cannot already have an ID")).body(null);
        }
        
        video.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get());
        Video result = videoRepository.save(video);
        videoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/videos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("video", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /videos -> Updates an existing video.
     */
    @RequestMapping(value = "/videos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Video> updateVideo(@Valid @RequestBody Video video) throws URISyntaxException {
        log.debug("REST request to update Video : {}", video);
        if (video.getId() == null) {
            return createVideo(video);
        }
        Video result = videoRepository.save(video);
        videoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("video", video.getId().toString()))
            .body(result);
    }

    /**
     * GET  /videos -> get all the videos.
     */
    @RequestMapping(value = "/videos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Video> getAllVideos() {
        log.debug("REST request to get all Videos");
        return videoRepository.findAll();
            }

    /**
     * GET  /videos/:id -> get the "id" video.
     */
    @RequestMapping(value = "/videos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Video> getVideo(@PathVariable Long id) {
        log.debug("REST request to get Video : {}", id);
        Video video = videoRepository.findOne(id);
        return Optional.ofNullable(video)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /videos/:id -> delete the "id" video.
     */
    @RequestMapping(value = "/videos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        log.debug("REST request to delete Video : {}", id);
        videoRepository.delete(id);
        videoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("video", id.toString())).build();
    }

    /**
     * SEARCH  /_search/videos/:query -> search for the video corresponding
     * to the query.
     */
    @RequestMapping(value = "/_search/videos/{query:.+}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Video> searchVideos(@PathVariable String query) {
        log.debug("REST request to search Videos for query {}", query);
        return StreamSupport
            .stream(videoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
