package vn.edu.iuh.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.dtos.CommentDTO;
import vn.edu.iuh.models.Comment;
import vn.edu.iuh.models.Video;
import vn.edu.iuh.repositories.VideoRepository;
import vn.edu.iuh.dtos.VideoDTO;
import vn.edu.iuh.responses.UploadVideoResponse;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final UserService userService;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) {
        String videoUrl = s3Service.uploadFile(multipartFile);
        Video video = new Video();
        video.setVideoUrl(videoUrl);

        Video savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public VideoDTO editVideo(MultipartFile file,VideoDTO videoDTO) {
        Video savedVideo = getVideoById(videoDTO.getId());

        savedVideo.setUserId(videoDTO.getUserId());
        savedVideo.setTitle(videoDTO.getTitle());
        savedVideo.setDescription(videoDTO.getDescription());
        savedVideo.setTags(videoDTO.getTags());
        savedVideo.setVideoStatus(videoDTO.getVideoStatus());
        savedVideo.setCreatedAt(new Date());

        String thumbnailUrl = s3Service.uploadFile(file);
        savedVideo.setThumbnailUrl(thumbnailUrl);

        videoRepository.save(savedVideo);
        return videoDTO;
    }

    public Video getVideoById(String videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + videoId));
    }

    public VideoDTO getVideoDetail(String videoId) {
        Video video = getVideoById(videoId);
        increaseViewCount(video);
        return toVideoDTO(video);
    }
    private void increaseViewCount(Video video){
        video.incrementView();
        userService.addVideoHistory(video.getId());
        videoRepository.save(video);
    }
    private VideoDTO toVideoDTO(Video video){
        return VideoDTO.builder()
                .videoStatus(video.getVideoStatus())
                .userId(video.getUserId())
                .description(video.getDescription())
                .tags(video.getTags())
                .title(video.getTitle())
                .thumbnailUrl(video.getThumbnailUrl())
                .id(video.getId())
                .videoUrl(video.getVideoUrl())
                .likedCount(video.getLikes().get())
                .dislikedCount(video.getDislikes().get())
                .viewCount(video.getViewCount().get())
                .createdAt(video.getCreatedAt())
                .build();
    }

    public VideoDTO likeVideo(String videoId) {
        Video video = getVideoById(videoId);

        if(userService.ifLikedVideo(videoId)){
            video.decrementLike();
            userService.removeFromLikedVideos(videoId);
        }else if(userService.ifDislikedVideo(videoId)){
            video.decrementDislike();
            userService.removeFromDislikedVideos(videoId);
            video.incrementLike();
            userService.addToLikedVideos(videoId);
        }else{
            video.incrementLike();
            userService.addToLikedVideos(videoId);
        }
        videoRepository.save(video);
        return toVideoDTO(video);
    }


    public VideoDTO dislikeVideo(String videoId) {
        Video video = getVideoById(videoId);
        if(userService.ifDislikedVideo(videoId)){
            video.decrementDislike();
            userService.removeFromDislikedVideos(videoId);
        }else if(userService.ifLikedVideo(videoId)){
            video.decrementLike();
            userService.removeFromLikedVideos(videoId);
            video.incrementDislike();
            userService.addToDislikedVideos(videoId);
        }else{
            video.incrementDislike();
            userService.addToDislikedVideos(videoId);
        }
        videoRepository.save(video);
        return toVideoDTO(video);
    }

    public VideoDTO commentVideo(String videoId, CommentDTO commentDTO) {
        Video video = getVideoById(videoId);
        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setContent(commentDTO.getContent());
        comment.setAuthorId(commentDTO.getAuthorId());
        comment.setCreatedAt(new Date());
        video.addComment(comment);
        videoRepository.save(video);
        return toVideoDTO(video);
    }

    public List<CommentDTO> getComments(String videoId) {
        Video video = getVideoById(videoId);
        List<Comment> comments = video.getComments();
        comments.sort((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()));
        return comments.stream().map(this::toCommentDTO).toList();
    }

    private CommentDTO toCommentDTO(Comment comment){
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .authorId(comment.getAuthorId())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    public List<VideoDTO> getVideos(String search) {
        List<VideoDTO> videos = new java.util.ArrayList<>(videoRepository.search(search).stream().map(this::toVideoDTO).toList());
        videos.sort((v1, v2) -> v2.getCreatedAt().compareTo(v1.getCreatedAt()));
        return videos;
    }

    public VideoDTO deleteComment(String videoId, String commentId) {
        Video video = getVideoById(videoId);
        video.removeComment(commentId);
        videoRepository.save(video);
        return toVideoDTO(video);
    }

    public List<VideoDTO> getLikedVideos() {
        return userService.getCurrentUser().getLikedVideos().stream().map(this::getVideoById).map(this::toVideoDTO).toList();
    }

    public List<VideoDTO> getSubscribedVideos() {
        Set<String> subscribedToUsers = userService.getCurrentUser().getSubscribedToUsers();
        List<VideoDTO> videos = getVideos("");
        List<VideoDTO> subscribedVideos = new java.util.ArrayList<>(videos.stream().filter(video -> subscribedToUsers.contains(video.getUserId())).toList());
        subscribedVideos.sort((v1, v2) -> v2.getCreatedAt().compareTo(v1.getCreatedAt()));
        return subscribedVideos;

    }

    public List<VideoDTO> getHistory() {
        return userService.getCurrentUser().getVideoHistory().stream().map(this::getVideoById).map(this::toVideoDTO).toList();
    }
}
