package vn.edu.iuh.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadVideoResponse {
    private String videoId;
    private String videoUrl;
}
