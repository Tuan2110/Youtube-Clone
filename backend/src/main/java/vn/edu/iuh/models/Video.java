package vn.edu.iuh.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;


@Document(value = "Video")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {
    @Id
    private String id;
    private String title;
    private String description;
    private String userId;
    private AtomicInteger likes = new AtomicInteger(0);
    private AtomicInteger dislikes = new AtomicInteger(0);
    private Set<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private AtomicInteger viewCount = new AtomicInteger(0);
    private String thumbnailUrl;
    private List<Comment> comments = new CopyOnWriteArrayList<>();
    private Date createdAt;

    public void incrementLike(){
        likes.incrementAndGet();
    }
    public void decrementLike(){
        if(likes.get() == 0)
            return;
        likes.decrementAndGet();
    }
    public void incrementDislike(){
        dislikes.incrementAndGet();
    }
    public void decrementDislike(){
        if(dislikes.get() == 0)
            return;
        dislikes.decrementAndGet();
    }

    public void incrementView() {
        viewCount.incrementAndGet();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void removeComment(String commentId) {
        comments.removeIf(comment -> comment.getId().equals(commentId));
    }
}
