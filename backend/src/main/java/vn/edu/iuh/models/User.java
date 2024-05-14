package vn.edu.iuh.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Document(value = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String sub;
    private String picture;
    private Set<String> subscribedToUsers = ConcurrentHashMap.newKeySet();
    private Set<String> subscribers = ConcurrentHashMap.newKeySet();
    private List<String> videoHistory = new ArrayList<>();
    private Set<String> likedVideos = ConcurrentHashMap.newKeySet();
    private Set<String> dislikedVideos = ConcurrentHashMap.newKeySet();

    public void addToLikedVideos(String videoId){
        likedVideos.add(videoId);
    }
    public void removeFromLikedVideos(String videoId){
        likedVideos.remove(videoId);
    }
    public void addToDislikedVideos(String videoId){
        dislikedVideos.add(videoId);
    }
    public void removeFromDislikedVideos(String videoId){
        dislikedVideos.remove(videoId);
    }

    public void addVideoHistory(String id) {
        videoHistory.add(0,id);
    }

    public void addSubscribedToUsers(String userId) {
        subscribedToUsers.add(userId);
    }

    public void addSubscribers(String id) {
        subscribers.add(id);
    }

    public void removeSubscribedToUsers(String userId) {
        subscribedToUsers.remove(userId);
    }
    public void removeSubscribers(String id) {
        subscribers.remove(id);
    }
}
