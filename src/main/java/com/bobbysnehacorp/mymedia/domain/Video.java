package com.bobbysnehacorp.mymedia.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Video.
 */
@Entity
@Table(name = "video")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "video")
public class Video implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "video_name", nullable = false)
    private String video_name;
    
    @NotNull
    @Column(name = "added_by", nullable = false)
    private String added_by;
    
    @NotNull
    @Column(name = "language", nullable = false)
    private String language;
    
    @NotNull
    @Column(name = "video_location", nullable = false)
    private String video_location;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideo_name() {
        return video_name;
    }
    
    public void setVideo_name(String video_name) {
        this.video_name = video_name;
    }

    public String getAdded_by() {
        return added_by;
    }
    
    public void setAdded_by(String added_by) {
        this.added_by = added_by;
    }

    public String getLanguage() {
        return language;
    }
    
    public void setLanguage(String language) {
        this.language = language;
    }

    public String getVideo_location() {
        return video_location;
    }
    
    public void setVideo_location(String video_location) {
        this.video_location = video_location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Video video = (Video) o;
        if(video.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, video.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Video{" +
            "id=" + id +
            ", video_name='" + video_name + "'" +
            ", added_by='" + added_by + "'" +
            ", language='" + language + "'" +
            ", video_location='" + video_location + "'" +
            '}';
    }
}
