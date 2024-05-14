package vn.edu.iuh.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.dtos.CommentDTO;
import vn.edu.iuh.dtos.VideoDTO;
import vn.edu.iuh.models.VideoStatus;
import vn.edu.iuh.responses.UploadVideoResponse;
import vn.edu.iuh.services.VideoService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/videos")
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UploadVideoResponse> uploadVideo(@RequestParam("file")MultipartFile file){
        return ResponseEntity.ok(videoService.uploadVideo(file));
    }


    @PutMapping
    public ResponseEntity<VideoDTO> editVideo(
            @RequestParam("id")String id,
            @RequestParam("file")MultipartFile file,
            @RequestParam("userId")String userId,
            @RequestParam("title")String title,
            @RequestParam("description")String description,
            @RequestParam("tags") String[] tags,
            @RequestParam("videoStatus") String videoStatus
                                              ){
        VideoDTO videoDTO = new VideoDTO();
        videoDTO.setId(id);
        videoDTO.setUserId(userId);
        videoDTO.setTitle(title);
        videoDTO.setDescription(description);
        videoDTO.setTags(Set.of(tags));
        videoDTO.setVideoStatus(VideoStatus.valueOf(videoStatus));
        System.out.println(videoDTO);
        return ResponseEntity.ok(videoService.editVideo(file,videoDTO));
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<VideoDTO> getVideoDetail(@PathVariable String videoId){
        return ResponseEntity.ok(videoService.getVideoDetail(videoId));
    }

    @PostMapping("/{videoId}/like")
    public ResponseEntity<VideoDTO> likeVideo(@PathVariable("videoId")String videoId){
        return ResponseEntity.ok(videoService.likeVideo(videoId));
    }
    @PostMapping("/{videoId}/dislike")
    public ResponseEntity<VideoDTO> dislikeVideo(@PathVariable("videoId")String videoId){
        return ResponseEntity.ok(videoService.dislikeVideo(videoId));
    }

    @PostMapping("/{videoId}/comment")
    public ResponseEntity<VideoDTO> commentVideo(@PathVariable("videoId")String videoId,@RequestBody CommentDTO commentDTO){
        return ResponseEntity.ok(videoService.commentVideo(videoId,commentDTO));
    }
    @DeleteMapping("/{videoId}/comment/{commentId}")
    public ResponseEntity<VideoDTO> deleteComment(@PathVariable("videoId")String videoId,@PathVariable("commentId")String commentId){
        return ResponseEntity.ok(videoService.deleteComment(videoId,commentId));
    }
    @GetMapping("/{videoId}/comment")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable("videoId")String videoId){
        return ResponseEntity.ok(videoService.getComments(videoId));
    }

    @GetMapping
    public ResponseEntity<List<VideoDTO>> getVideos(@RequestParam("search")String search){
        return ResponseEntity.ok(videoService.getVideos(search));
    }

    @GetMapping("/liked")
    public ResponseEntity<List<VideoDTO>> getLikedVideos(){
        return ResponseEntity.ok(videoService.getLikedVideos());
    }
    @GetMapping("/subscribed")
    public ResponseEntity<List<VideoDTO>> getSubscribedVideos(){
        return ResponseEntity.ok(videoService.getSubscribedVideos());
    }
    @GetMapping("/history")
    public ResponseEntity<List<VideoDTO>> getHistory(){
        return ResponseEntity.ok(videoService.getHistory());
    }
}
