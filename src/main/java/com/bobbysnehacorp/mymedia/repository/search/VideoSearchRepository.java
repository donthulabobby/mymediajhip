package com.bobbysnehacorp.mymedia.repository.search;

import com.bobbysnehacorp.mymedia.domain.Video;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Video entity.
 */
public interface VideoSearchRepository extends ElasticsearchRepository<Video, Long> {
}
