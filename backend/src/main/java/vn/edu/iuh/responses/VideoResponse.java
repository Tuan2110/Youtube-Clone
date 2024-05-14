package vn.edu.iuh.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.dtos.UserDTO;
import vn.edu.iuh.models.VideoStatus;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoResponse {
    private String id;
    private String title;
    private String description;
    private Set<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private String thumbnailUrl;
    private Integer likedCount;
    private Integer dislikedCount;
    private Integer viewCount;
    private UserDTO user;
}
