package vn.edu.iuh.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(value = "Comment")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Comment {
    @Id
    private String id;
    private String content;
    private String authorId;
    private Integer likeCount;
    private Integer dislikeCount;
    private Date createdAt;
}
