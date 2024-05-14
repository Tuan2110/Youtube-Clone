package vn.edu.iuh.dtos;

import lombok.*;
import vn.edu.iuh.models.VideoStatus;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class VideoDTO {
    private String id;
    private String userId;
    private String title;
    private String description;
    private Set<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private String thumbnailUrl;
    private Integer likedCount;
    private Integer dislikedCount;
    private Integer viewCount;
    private Date createdAt;
}
