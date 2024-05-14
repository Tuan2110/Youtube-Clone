package vn.edu.iuh.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import vn.edu.iuh.models.User;
import vn.edu.iuh.models.Video;
import vn.edu.iuh.repositories.UserRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Object sub = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getClaim("sub");
        return userRepository.findBySub(sub.toString()).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void addToLikedVideos(String videoId) {
        User user = getCurrentUser();
        user.addToLikedVideos(videoId);
        userRepository.save(user);
    }

    public boolean ifLikedVideo(String videoId) {
        return getCurrentUser().getLikedVideos().stream().anyMatch(videoId::equals);
    }

    public boolean ifDislikedVideo(String videoId) {
        return getCurrentUser().getDislikedVideos().stream().anyMatch(videoId::equals);
    }

    public void removeFromLikedVideos(String videoId) {
        User user = getCurrentUser();
        user.removeFromLikedVideos(videoId);
        userRepository.save(user);
    }

    public void removeFromDislikedVideos(String videoId) {
        User user = getCurrentUser();
        user.removeFromDislikedVideos(videoId);
        userRepository.save(user);
    }
    public void addToDislikedVideos(String videoId) {
        User user = getCurrentUser();
        user.addToDislikedVideos(videoId);
        userRepository.save(user);
    }

    public void addVideoHistory(String videoId) {
        User user = getCurrentUser();
        user.addVideoHistory(videoId);
        userRepository.save(user);
    }

    public Boolean subscribeUser(String userId) {
        User requestUser = getCurrentUser();
        requestUser.addSubscribedToUsers(userId);
        User user = getUserById(userId);
        user.addSubscribers(requestUser.getId());

        userRepository.save(requestUser);
        userRepository.save(user);
        return true;
    }
    public Boolean unsubscribeUser(String userId) {
        User requestUser = getCurrentUser();
        requestUser.removeSubscribedToUsers(userId);
        User user = getUserById(userId);
        user.removeSubscribers(requestUser.getId());

        userRepository.save(requestUser);
        userRepository.save(user);
        return true;
    }

    public List<String> getHistory(String userId) {
        User user = getUserById(userId);
        return user.getVideoHistory();
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
